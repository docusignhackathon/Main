from flask import Flask, request, abort, jsonify
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from newsapi import NewsApiClient
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

def get_sentiment(paragraph=""):
    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(paragraph)
    return ss["compound"]

def get_news(query="climate"):
    newsapi = NewsApiClient(api_key=process.env.NEWS_API_KEY)
    news = newsapi.get_everything(q=query,
                                  language='en',
                                  sort_by='popularity',
                                  page_size=100)
    return news['articles']

app = Flask(__name__)
CORS(app)

@app.route('/news', methods=['GET'])
def news_sentiment():
    print("request recieved")
    if not request:
        abort(400)
    category = request.args.get("category")
    location = request.args.get("location")
    query = category +" " + location
    print(query)

    news_list = get_news(query)
    print(news_list)
    response = []
    for news_json in news_list:
        # sentiment = get_sentiment(paragraph= news_json["content"])
        sentiment = get_sentiment(paragraph= news_json["description"])
        if sentiment > 0.7:
            response.append({
                            "url": news_json["url"],
                            "title": news_json["title"],
                            "author": news_json["author"],
                            "summary": news_json["description"],
                            "sentiment": "HAPPY"})
        elif sentiment < -0.2 and sentiment>-0.8:
            response.append({
                            "url": news_json["url"],
                            "title": news_json["title"],
                            "author": news_json["author"],
                            "summary": news_json["description"],
                            "sentiment": "SAD"})
        elif sentiment<-0.8:
            response.append({
                            "url": news_json["url"],
                            "title": news_json["title"],
                            "author": news_json["author"],
                            "summary": news_json["description"],
                            "sentiment": "ANGRY"})
        # else:
        #     response.append({
        #                     "url": news_json["url"],
        #                     "title": news_json["title"],
        #                     "author": news_json["author"],
        #                     "summary": news_json["description"],
        #                     "sentiment": "NEUTRAL"})

    jsonResponse = jsonify(response)
    print(jsonResponse)
    return jsonResponse

if __name__ == "__main__":
    app.run(port=5001)
