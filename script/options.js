/**
 *
 * Created by ryotsun on 2/19/16.
 */
'use strict';
var init = function() {
  document.getElementById('unread-room-num').nextElementSibling.textContent = chrome.i18n.getMessage('optionUnread');
  document.getElementById('change-bg-color').nextElementSibling.textContent = chrome.i18n.getMessage('optionHighlight');
  document.getElementById('change-bg-color-all').nextElementSibling.textContent = chrome.i18n.getMessage('optionHighlightRule');
  document.getElementById('star-list').nextElementSibling.textContent = chrome.i18n.getMessage('optionStar');
  document.getElementById('save').value = chrome.i18n.getMessage('optionSave');
  document.getElementById('saved').textContent = chrome.i18n.getMessage('optionSaved');
};

init();
//chrome.storage.sync.clear();
var data = [
  "unread-room-num",
  "change-bg-color",
  "change-bg-color-all",
  "star-list",
];
chrome.storage.sync.get(data, function(values) {
  if (!$.isEmptyObject(values)) {
    $('#unread-room-num').prop('checked', values["unread-room-num"]);
    $('#change-bg-color').prop('checked', values["change-bg-color"]);
    $('#change-bg-color-all').prop('checked', values["change-bg-color-all"]);
    $('#star-list').prop('checked', values["star-list"]);
  } else {
    $('#unread-room-num').prop('checked', true);
    $('#change-bg-color').prop('checked', true);
    $('#change-bg-color-all').prop('checked', true);
    $('#star-list').prop('checked', true);
  }
});

$('#save').on('click', function() {
  var data = {
    "unread-room-num": $('#unread-room-num').prop('checked'),
    "change-bg-color": $('#change-bg-color').prop('checked'),
    "change-bg-color-all": $('#change-bg-color-all').prop('checked'),
    "star-list": $('#star-list').prop('checked'),
  };
  chrome.storage.sync.set(data, function() {
    $('#saved').show(0, function() {$(this).fadeOut(2500)});
  });
});
