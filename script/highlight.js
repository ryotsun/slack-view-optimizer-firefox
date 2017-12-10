/**
 *
 * Created by ryotsun on 2/10/16.
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

  if (values['change-bg-color']) {
      if (values['change-bg-color-all']) {
          var is_all = function() {
              is_all = function () {
                  return true;
              }
          }
      } else {
          var is_all = function () {
              is_all = function () {
                  return false;
              };
          };
      }

      document.body.appendChild(function() {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.text = "(" + is_all.toString() + ")();";
          return script;
      }());

      document.body.appendChild(function() {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.text = '';

          var main = function() {
              var colorMentionedMessages = {
                  originalBuildHTML: TS.templates.builders.msgs.buildHTML
              };

              TS.templates.builders.msgs.buildHTML = function(O, h) {
                  var originalHTML = colorMentionedMessages.originalBuildHTML(O, h);
                  try {
                      var target = $(originalHTML);

                      var html = "";
                      for(var i = 0, l = target.length; i < l; i++) {
                          var mentioned_msgs = $(target[i]).find('.message_body .mention, .message_content .comment .mention');
                          if (mentioned_msgs.length > 0) {
                              if (mentioned_msgs[0].innerText.indexOf('@') !== -1) {
                                  $(target[i]).addClass('hl-mention');
                              } else {
                                  // @ が含まれていなくても背景色をつける
                                  //console.log(values);
                                  if (is_all()) {
                                    $(target[i]).addClass('hl-mention');
                                  }
                              }
                          }
                          html += target[i].outerHTML
                      }
                      return html;
                  } catch(e) {
                      //console.info(e.stack);
                      console.info("something went wrong; highlight.js")
                      return originalHTML;
                  }
              };
          };

          script.text += "(" + main.toString() + ")();";
          return script;
      }());
  }
});
