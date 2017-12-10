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

  if (values['star-list']) {
    document.body.appendChild(function() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.text = '';

      // Starred Items
      var code_star_item = function() {
        var starred_items = {
            init_starred_list: function () {
                // Starred Itemsペインの開閉
                if ($('#stars_tab').width() === 0) return;
                var starred_items = $('#member_stars_list .message_content');
                var l = starred_items.length;
                for (var i = 0; i < l; i++) {
                    if ($(starred_items[i]).height() > 100) {
                        $(starred_items[i]).css({"max-height": "100px", "overflow": "hidden", "cursor": "pointer"});

                        if ($(starred_items[i]).next('p').hasClass("read_more") === false) {
                            $(starred_items[i]).parent().parent().css({"cursor": "pointer"});
                            $(starred_items[i]).children(".message_body").css({"cursor": "pointer"});
                        } else {
                            $(starred_items[i]).next('.read_more').text('Read More...');
                        }
                    }
                }
            }
        };

        var starredMessages = {
            originalStarredItemHTML: TS.templates.builders.buildStarredItemHTML,
            originalStarredListFunction: TS.view.rebuildStars
        };

        TS.view.rebuildStars = function(m) {
            var originalFunction = starredMessages.originalStarredListFunction(m);
            console.log(originalFunction);

            try {
                originalFunction;
                starred_items.init_starred_list();
            } catch (e) {
                console.info(e.stack);
                console.info("something went wrong in starred_items.js");
                return originalFunction;
            }
        };

        TS.templates.builders.buildStarredItemHTML = function(m) {
            var originalHTML = starredMessages.originalStarredItemHTML(m);
            console.log(originalHTML);

            try {
                var target = $(originalHTML);

                var html = "";
                for(var i = 0, l = target.length; i < l; i++) {
                    var p = document.createElement('p');
                    p.innerHTML = 'Read More...';
                    p.className = 'read_more';

                    target[i].appendChild(p);
                    html += target[i].outerHTML;
                    console.log(target[i]);
                }
                return html;
            } catch(e) {
                console.info(e.stack);
                console.info("something went wrong in starred_items.js");
                return originalHTML;
            }
        };

        // .star_item内にhover表示のボタンがあるため、それらをクリックした際に開閉しないようにしてる
        // 気持ち悪いからなんとかしたい。
        $(document).on('click', '#member_stars_list .actions, .rxn_panel', function() {
          return false;
        });

        // starred items の開閉処理
        $(document).on('click', '#member_stars_list .star_item', function(e) {
          if (e.target.tagName !== 'A' && e.target.className.indexOf('mention') < 0) {
            var message_content = $(".message_content", this);
            var height = message_content.height();
            if (height <= 100) {
              message_content.css({"max-height": "inherit"});
              $(".read_more", this).text("Close");
            } else {
              message_content.css({"max-height": "100px"});
              $(".read_more", this).text("Read More...");
            }
          }
        });
      };

      script.text += "(" + code_star_item.toString() + ")();";
      return script;
    }());
  }
});
