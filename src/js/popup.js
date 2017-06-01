import '../../node_modules/basscss/css/basscss.min.css';
import '../../node_modules/purecss/build/pure-min.css';
import "../css/popup.css";

var $ = require("jquery");
var _ = require("lodash");

function openOptionPage() {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }
}

$('#setup-options-button').bind('click', openOptionPage);
