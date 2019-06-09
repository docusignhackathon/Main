import React, { useEffect, useState } from 'react';

const News = ({ category }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    fetch(`http://1d70a7fb.ngrok.io/news?category=${category}&location=California`)
      .then(response => response.json()).then(setNewsArticles);
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Summary</th>
          <th>Author</th>
          <th>Sentiment</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {newsArticles.map(newsArticle =>
          <tr key={newsArticle.url}>
            <td>{newsArticle.title}</td>
            <td>{newsArticle.summary}</td>
            <td>{newsArticle.author}</td>
            <td>{newsArticle.sentiment}</td>
            <td>{newsArticle.url}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

export default News;
