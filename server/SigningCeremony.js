require('dotenv').config();
const docusign = require('docusign-esign')
    , path = require('path')
    , fs = require('fs')
    , process = require('process')
    , basePath = 'https://demo.docusign.net/restapi'
    , express = require('express')
    , envir = process.env
    , documents = require('./documents.json')
    ;

const ACCESS_TOKEN = envir.ACCESS_TOKEN;
const ACCOUNT_ID = envir.ACCOUNT_ID;
const USER_FULLNAME = envir.USER_FULLNAME;
const USER_EMAIL = envir.USER_EMAIL;

// baseUrl is the url of the application's web server. Eg http://localhost:3000
let baseUrl = envir.BASE_URL || 'http://localhost:3000'

async function SigningCeremony (body, res) {
  // Recipient Information:
  const clientUserId = '123' // Used to indicate that the signer will use an embedded
                             // Signing Ceremony. Represents the signer's userId within
                             // your application.
      , authenticationMethod = 'None' // How is this application authenticating
                                      // the signer? See the `authenticationMethod' definition
                                      // https://developers.docusign.com/esign-rest-api/reference/Envelopes/EnvelopeViews/createRecipient

  // The document to be signed. Path is relative to the root directory of this file.
  const documentMetadata = documents[body.category];
  const fileName = documentMetadata.fileName;

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /**
   *  Step 1. The envelope definition is created.
   *          One signHere tab is added.
   *          The document path supplied is relative to the working directory
   */
  const envDef = new docusign.EnvelopeDefinition();
  //Set the Email Subject line and email message
  envDef.emailSubject = documentMetadata.emailSubject;
  envDef.emailBlurb = documentMetadata.emailBlurb;

  // Read the file from the document and convert it to a Base64String
  const pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName))
      , pdfBase64 = pdfBytes.toString('base64');

  // Create the document request object
  const doc = docusign.Document.constructFromObject({documentBase64: pdfBase64,
        fileExtension: 'pdf',  // You can send other types of documents too.
        name: 'Sample document', documentId: '1'});

  // Create a documents object array for the envelope definition and add the doc object
  envDef.documents = [doc];

  // Create the signer object with the previously provided name / email address
  const signer = docusign.Signer.constructFromObject({
    name: USER_FULLNAME,
    email: USER_EMAIL,
    routingOrder: '1',
    recipientId: '1',
    clientUserId: clientUserId
  });

  // Create the signHere tab to be placed on the envelope
  const signHereTabs = documentMetadata.signHereTabs.map(signHereTab =>
    docusign.SignHere.constructFromObject({
      documentId: '1',
      pageNumber: '1',
      recipientId: '1',
      tabLabel: signHereTab.TAbLabel,
      xPosition: signHereTab.xPosition,
      yPosition: signHereTab.yPosition
    })
  );

  // Create the overall tabs object for the signer and add the signHere tabs array
  // Note that tabs are relative to receipients/signers.
  signer.tabs = docusign.Tabs.constructFromObject({signHereTabs: signHereTabs});

  // Add the recipients object to the envelope definition.
  // It includes an array of the signer objects.
  envDef.recipients = docusign.Recipients.constructFromObject({signers: [signer]});
  // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
  envDef.status = 'sent';

  /**
   *  Step 2. Create/send the envelope.
   *          We're using a promise version of the SDK's createEnvelope method.
   */
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(basePath);
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
  // Set the DocuSign SDK components to use the apiClient object
  docusign.Configuration.default.setDefaultApiClient(apiClient);
  let envelopesApi = new docusign.EnvelopesApi()
    , results;

  try {
    results = await envelopesApi.createEnvelope(ACCOUNT_ID, {'envelopeDefinition': envDef})
    /**
     * Step 3. The envelope has been created.
     *         Request a Recipient View URL (the Signing Ceremony URL)
     */
    const envelopeId = results.envelopeId
        , recipientViewRequest = docusign.RecipientViewRequest.constructFromObject({
            authenticationMethod: authenticationMethod, clientUserId: clientUserId,
            recipientId: '1', returnUrl: baseUrl,
            userName: USER_FULLNAME, email: USER_EMAIL
          })
        ;

    results = await envelopesApi.createRecipientView(ACCOUNT_ID, envelopeId,
                      {recipientViewRequest: recipientViewRequest});
    /**
     * Step 4. The Recipient View URL (the Signing Ceremony URL) has been received.
     *         Redirect the user's browser to it.
     */
    res.redirect (results.url)
  } catch (e) {
    // Handle exceptions
    let body = e.response && e.response.body;
    if (body) {
      // DocuSign API exception
      res.send (`<html lang="en"><body>
                  <h3>API problem</h3><p>Status code ${e.response.status}</p>
                  <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
    } else {
      // Not a DocuSign exception
      throw e;
    }
  }
}

module.exports = SigningCeremony;
