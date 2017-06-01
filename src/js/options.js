import '../../node_modules/basscss/css/basscss.min.css';
import '../../node_modules/purecss/build/pure-min.css';
import '../css/options.css';

var $ = require("jquery");
var _ = require("lodash");

$(function() {
  var
    $targetUrlList = $('#target-url-list'),
    $targetUrlButton = $('#target-url-button'),
    $intervalSec = $('#interval-sec'),
    $intervalRand = $('#interval-rand'),
    $targetSelector = $('#target-selector'),
    $targetUrlMessage = $('#option-target-url-message'),
    $targetSelectorMessage = $('#option-target-selector-message'),
    $intervalTimeMessage = $('#option-interval-time-message')
  ;

  function saveTargetUrls(e) {
    var targetUrls = $('#target-url-list')
      .find('input[name="target-urls[]"]')
      .map(function() {
        return $(this).val();
      });
    console.log(targetUrls);
  }
  // Saves options to chrome.storage.sync.
  function saveOptions(e) {
    var $input = $(e.currentTarget);
    console.log($input, $input.val());

    chrome.storage.sync.set({
      intervalSec: $intervalSec.val(),
      intervalRand: !!$intervalRand.val(),
      targetSelector: $targetSelector.val()
    }, function() {
      // Update status to let user know options were saved.
      $message.innerText = '🆗 Default options saved.';
      $message.show();
      $message.hide(1000);
    });
  }

  function appendTargetUrlForm(e) {
    e.preventDefault();
    var $last = $targetUrlList.children('li').last();
    $last.clone(true).appendTo($targetUrlList);
    $last.focus();
  }

  var $targetUrls = $targetUrlList.find('input[name="target-urls[]"]');
  $targetUrls.on('change', saveTargetUrls);
  $targetUrlButton.on('click', appendTargetUrlForm);
});

