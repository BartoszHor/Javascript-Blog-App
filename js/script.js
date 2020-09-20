const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML),
};
'use strict';
{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optPostAuthor = '.post-author',
    optTagsListSelector = '.list.tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optArticleAuthorList = '.authors';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = ''){
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  const calculateTagsParams = function(tags) {
    const params = {
      max : 0,
      min : 999999
    };
    for (let tag in tags) {
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }

    return params;
  };

  const calculateTagsClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return classNumber;
  };

  const generateTags = function(){
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    /*for every article*/
    for (let article of articles) {
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      let html = '';
      const tags = article.getAttribute('data-tags');
      const tagsArray = tags.split(' ');
      for (let tag of tagsArray) {
        const tagLinkData = {tag: tag};
        const linkHTML = templates.tagLink(tagLinkData);
        html = html + linkHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    }

    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = {tags: []};

    for(let tag in allTags){
      allTagsHTML = allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: optCloudClassPrefix + calculateTagsClass(allTags[tag], tagsParams)
      });
      //'<li><a href="#tag-' + tag +'" class="' + optCloudClassPrefix + calculateTagsClass(allTags[tag], tagsParams) + '">'+ tag +' </a></li> ';
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  };
  generateTags();

  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let tagLink of tagLinks) {
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag +'"]');
  };

  const addClickListenersToTags = function(){
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    for (let linkToTag of allLinksToTags) {
      linkToTag.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorWrapper = article.querySelector(optPostAuthor);
      const author = article.getAttribute('data-author');
      const linkHTMLData = {author : author};
      const linkHTML = templates.authorLink(linkHTMLData);

      if(!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
    }
    const allAuthorHTML = {authors: []};
    for (let author in allAuthors) {
      allAuthorsHTML = allAuthorHTML.authors.push({
        author: author,
        authorCount: allAuthors[author]
      });
      //'<li><a href="#author-'+ author +'">' + author + ' ' + '(' + allAuthors[author] + ')' + '</a></li>';
    }
    const authorList = document.querySelector(optArticleAuthorList);
    authorList.innerHTML = templates.authorListLink(allAuthorHTML);
  };
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author +'"]');
  };

  const addClickListenersToAuthors = function(){
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author"]');
    for (let linkToAuthor of allLinksToAuthors) {
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}




























