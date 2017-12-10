/**
 * Created by ryotsun on 2/24/16.
 */
'use strict';
var data = [
  "unread-room-num",
  "change-bg-color",
  "change-bg-color-all",
  "star-list",
];
chrome.storage.sync.get(data, function(values) {
  if (Object.keys(values).length === 0) {
    var init_setting = {
      "unread-room-num": true,
      "change-bg-color": true,
      "change-bg-color-all": true,
      "star-list": true,
    };
    chrome.storage.sync.set(init_setting, function () {
    });
    values = {
      "unread-room-num": true,
      "change-bg-color": true,
      "change-bg-color-all": true,
      "star-list": true,
    };
  }

  if (values['unread-room-num']) {
    updateUnreadMentionedRoomNum();
  }
});

function updateUnreadMentionedRoomNum() {
  var elem = document.querySelectorAll('#col_channels #channels_scroller div:not(#all-unreads-list) .unread');
  var unread_num = elem.length;
  var title = document.querySelector('title');

  if (unread_num > 0 && title.innerHTML.indexOf('[') < 0) {
    var new_title = '[' + unread_num + ']' + title.textContent;
    title.textContent = new_title;
  } else if (unread_num > 0) {
    title.textContent = title.innerHTML.replace(/.*\[.*\]/g, '[' + unread_num + ']');
  } else if (unread_num === 0) {
    title.textContent = title.innerHTML.replace(/.*\[.*\]/g, '');
  }
  // タイマー登録
  setTimeout(updateUnreadMentionedRoomNum, 3000);
}
