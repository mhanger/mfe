import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// mount function
const mount = (el) => {
  ReactDOM.render(
    <App />,
    el
  );
}

//developmnet, call immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// running in container

export { mount }