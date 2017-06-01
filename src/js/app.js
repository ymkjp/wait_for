var $ = require("jquery");
var _ = require("lodash");


(function(w) {
  'use strict';
  var INTERVAL_MS = 30 * 1000;
  var INTERVAL_RAND = true;
  var TARGET_ELEMENT = '#jquery.selectors';
  var $target;

  function reloadLater(ms) {
    w.setTimeout(function(){
      w.location.reload(true);
    }, ms);
  }
  chrome.storage.sync.get([
    'targetSelector',
    'intervalSec',
    'intervalRand'
  ], function (items) {
    TARGET_ELEMENT = items['targetSelector'];
    INTERVAL_MS = items['intervalSec'];
    INTERVAL_RAND = items['intervalRand'];
  });

  $(function() {
    $target = $(TARGET_ELEMENT);
    if ($target.length > 0 && INTERVAL_RAND) {
      reloadLater(INTERVAL_MS * w.Math.random());
    } else if ($target.length > 0) {
      reloadLater(INTERVAL_MS);
    } else {
      w.prompt('Successfully loaded selector element. Stop the script and proceed! Loaded UNIX time:',
        w.Date.now().toString());
    }
  });

}(window));
