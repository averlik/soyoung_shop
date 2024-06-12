import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', marginBottom:'130px'}}>
      <h1>упс...<br />страница не найдена :( </h1>
      <p>Можете перейти на <Link to="/">главную</Link>.</p>
    </div>
  );
};

export default ErrorPage;
