//import {apiKey,newsBlock} from './config';

class News {
    /**
     * Inits instance
     * @param node - DOM node to instantiate class
     */
    init(node) {
        this.BLOCK = node;
        this.NEWS_BLOCK = this.BLOCK.querySelector('.news-block');
        this.GET_ALL_CHANELL_BUTTON = this.BLOCK.querySelector('.sources-block');
        this.GET_ALL_CHANELL_BUTTON.addEventListener('click', (e)=> {
            let target = e.target;
            if (target.classList.contains('source-list-img')) {
                let source = target.dataset.chanel;
                this.sendRequest(source);
            }
        });
        //console.log(apiKey);
    };
    
    sendRequest(source) {
        let url = this.buildUrl(source);
        fetch(url).
        then((response) => this.parseJSON(response)).
        then((data) => this.parseData(data)).
        then((nodes) => this.render({
                nodes
        })).
        catch((err) => console.log(err));
    };
    /**
     * Parses data from response
     * @param data {Object} - data from API
     * @returns {Array|*|{}}
     */
    parseJSON(data) {
        return data.json();
    };
    
    /**
     * Renders result to DOM
     * @param stringNodes {String} - assembled news items
     */
    render({
        nodes: stringNodes
    }) {
         stringNodes.map((el) => this.NEWS_BLOCK.insertAdjacentHTML('afterbegin', el));
    };
    
    parseData(data) {
        return data.articles.map((item) => {
            const {
                urlToImage,
                author,
                title,
                description,
                url
            } = item;
           return `
                <div class="news-list-item">
                    <img class="news-list-item-img" src="${urlToImage}" alt="News Article Image">
                    <div class="news-list-item-wrapper">
                        <div class="news-list-item-data">
                            <div class="news-list-item-content">
                                <span class="news-list-item-author"><span class="caption">Author: </span>${author}</span>
                                <h1 class="news-list-item-title"><a href="#">${title}</a></h1>
                                <p class="news-list-item-description">${description}</p>
                                <a href="${url}" class="news-list-item-button">Read more</a>
                            </div>
                        </div>
                    </div>
                </div>
              `;
            
        });
    };
    
    buildUrl(source) {
        if (source && source.length > 0) {
            return `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=8eef20059fff4d46b5a8712e64d166f6`
        }
    };
};

document.addEventListener( 'DOMContentLoaded', function () {
    let newsBlock = document.querySelector('.content');
    let newsInstance = new News();
    if (newsBlock) {
        newsInstance.init(newsBlock);
    }
}, false );

