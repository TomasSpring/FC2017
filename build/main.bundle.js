'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var News = function () {
    function News() {
        _classCallCheck(this, News);
    }

    _createClass(News, [{
        key: 'init',

        /**
         * Inits instance
         * @param node - DOM node to instantiate class
         */
        value: function init(node) {
            this.BLOCK = node;
            this.NEWS_BLOCK = this.BLOCK.querySelector('.news-block');
            this.GET_ALL_CHANELL_BUTTON = this.BLOCK.querySelector('.sources-block');
            var that = this;
            this.GET_ALL_CHANELL_BUTTON.addEventListener('click', function (e) {
                var target = e.target;
                if (target.classList.contains('source-list-img')) {
                    this.SOURCE = target.dataset.chanel;
                    that.sendRequest(this.SOURCE);
                }
            });
        }
    }, {
        key: 'sendRequest',
        value: function sendRequest(source) {
            var _this = this;

            var url = this.buildUrl(source);
            var req = new Request(url);
            fetch(url).then(function (response) {
                return _this.parseJSON(response);
            }).then(function (data) {
                return _this.parseData(data);
            }).then(function (nodes) {
                return _this.render({
                    nodes: nodes
                });
            }).catch(function (err) {
                return console.log(err);
            });
        }
    }, {
        key: 'parseJSON',

        /**
         * Parses data from response
         * @param data {Object} - data from API
         * @returns {Array|*|{}}
         */
        value: function parseJSON(data) {
            return data.json();
        }
    }, {
        key: 'render',

        /**
         * Renders result to DOM
         * @param stringNodes {String} - assembled news items
         */
        value: function render(_ref) {
            var _this2 = this;

            var stringNodes = _ref.nodes;

            this.NEWS_BLOCK.innerHTML = '';
            stringNodes.map(function (el) {
                return _this2.NEWS_BLOCK.insertAdjacentHTML('afterbegin', el);
            });
        }
    }, {
        key: 'parseData',
        value: function parseData(data) {
            return data.articles.map(function (item) {
                var urlToImage = item.urlToImage,
                    publishedAt = item.publishedAt,
                    author = item.author,
                    title = item.title,
                    description = item.description,
                    url = item.url;

                var newsCard = '\n                <div class="news-list-item">\n                    <img class="news-list-item-img" src="' + urlToImage + '" alt="News Article Image">\n                    <div class="news-list-item-wrapper">\n                        <div class="news-list-item-data">\n                            <div class="news-list-item-content">\n                                <span class="news-list-item-author"><span class="caption">Author: </span>' + author + '</span>\n                                <h1 class="news-list-item-title"><a href="#">' + title + '</a></h1>\n                                <p class="news-list-item-description">' + description + '</p>\n                                <a href="' + url + '" class="news-list-item-button">Read more</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n              ';
                return newsCard;
            });
        }
    }, {
        key: 'buildUrl',
        value: function buildUrl(source) {
            if (source && source.length > 0) {
                return 'https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=8eef20059fff4d46b5a8712e64d166f6';
            }
        }
    }]);

    return News;
}();

;
$(document).ready(function (e) {
    var newsBlock = document.querySelector('.content');
    var newsInstance = new News();
    if (newsBlock) {
        newsInstance.init(newsBlock);
    }
});
