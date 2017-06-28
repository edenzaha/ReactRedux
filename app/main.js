import React from 'react';
import ReactDOM from 'react-dom';
import Page1 from './Page1.js';
import Page2 from './Page2.jsx';
require("./css/global.css");


if (document.getElementById('root'))
ReactDOM.render(<Page2 />, document.getElementById('root'));
