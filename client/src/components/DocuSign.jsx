import React from 'react';

const DocuSign = ({ category }) =>
    <form action="/docusign" method="post" target="_blank">
      <input type="hidden" name="category" value={category} />
      <input type="submit" value="Sign the document!" />
    </form>;

export default DocuSign;
