import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { determineConfig } from './common/Config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App {...determineConfig()} />
  </>
);
