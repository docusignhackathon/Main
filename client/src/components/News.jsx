import React, { useLayoutEffect, useState } from 'react';

const News = ({ category, zipcode, articles }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  useLayoutEffect(() => {
    fetch(`http://localhost:5001/news?category=${category}&location=California`)
      .then(response => response.json()).then(setNewsArticles);
  });

  return (
    <table className="table table-striped text-center">
      <thead>
        <tr>
          {['Title', 'Summary', 'Author', 'Sentiment', 'URL'].map(header =>
            <th>{header}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {newsArticles.map(({url, title, summary, author, sentiment}) =>
          <tr key={url}>
            <td>{title}</td>
            <td>{summary}</td>
            <td>{author}</td>
            <td>{sentiment}</td>
            <td>{url}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

export default News;
