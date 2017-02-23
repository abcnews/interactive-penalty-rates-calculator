const ns = require('util-news-selectors');

const storyEl = document.querySelector(ns('story'));
const okEl = document.createElement('div');

okEl.className = 'interactive-penalty-rates-calculator-ok';
okEl.innerHTML = '<pre>interactive-penalty-rates-calculator OK!</pre>';
storyEl.appendChild(okEl);
