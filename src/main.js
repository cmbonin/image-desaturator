import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application/component';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Application />,
    document.getElementById('app')
  );
});
