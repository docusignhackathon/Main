import React, { useLayoutEffect, useState } from 'react';

const News = ({ category, articles }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  useLayoutEffect(() => {
    fetch(`http://1d70a7fb.ngrok.io/news?category=${category}&location=California`)
      .then(response => response.json()).then(setNewsArticles);
  });

  return (
    <table className="px-md-5 table table-striped table-hover table-sm w-50 p-3">
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
