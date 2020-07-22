const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authors-list-link').innerHTML)
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
    console.log('Link was clicked!');
    console.log(event);
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('Clicked element: ', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    console.log(activeArticles);

    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    console.log(customSelector);
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(optArticleSelector + customSelector);
    for(let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log(linkHTML);
      /* insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    console.log(links);
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
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);
      /* make html variable with empty string */
      let html = '';
      console.log(html);
      /* get tags from data-tags attribute */
      const tags = article.getAttribute('data-tags');
      console.log(tags);
      /* split tags into array */
      const tagsArray = tags.split(' ');
      console.log(tagsArray);
      /* START LOOP: for each tag */
      for (let tag of tagsArray) {
        /* generate HTML of the link */
        const tagLinkData = {tag: tag};
        const linkHTML = templates.tagLink(tagLinkData);

        /* add generated code to html variable */
        html = html + linkHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    }
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    // let allTagsHTML = '';
    const allTagsData = {tags: []};

    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML = allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: optCloudClassPrefix + calculateTagsClass(allTags[tag], tagsParams)
      });
      //'<li><a href="#tag-' + tag +'" class="' + optCloudClassPrefix + calculateTagsClass(allTags[tag], tagsParams) + '">'+ tag +' </a></li> ';
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
  };
  generateTags();

  const tagClickHandler = function(event){
  /* prevent default action for this event */
    event.preventDefault();
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
    /* remove class active */
      activeTag.classList.remove('active');
    }/* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
    /* add class active */
      tagLink.classList.add('active');
    } /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag +'"]');
  };

  const addClickListenersToTags = function(){
  /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let linkToTag of allLinksToTags) {
    /* add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(optPostAuthor);
      console.log(authorWrapper);
      /* get author from data-tags attribute */
      const author = article.getAttribute('data-author');

      const linkHTMLData = {author : author};
      const linkHTML = templates.authorLink(linkHTMLData);

      if(!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
    }
    //let allAuthorsHTML = '';
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

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeAuthor of activeAuthors) {
    /* remove class active */
      activeAuthor.classList.remove('active');
    }/* END LOOP: for each active author link */

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorLink of authorLinks) {
    /* add class active */
      authorLink.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author +'"]');
  };

  const addClickListenersToAuthors = function(){
  /* find all links to authors */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author"]');
    /* START LOOP: for each link */

    for (let linkToAuthor of allLinksToAuthors) {
    /* add tagClickHandler as event listener for that link */
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();

}




























