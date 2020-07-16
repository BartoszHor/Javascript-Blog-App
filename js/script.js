'use strict';
{
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

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optPostAuthor = '.post-author';

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
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  const generateTags = function(){
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
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
        console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>  ';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
      } /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    }
  };
  generateTags();

  const tagClickHandler = function(event){
  /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

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

  /* END LOOP: for each link */
  };

  addClickListenersToTags();

  const generateAuthors = function(){
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const authorWrapper = article.querySelector(optPostAuthor);
      /* get author from data-tags attribute */
      const author = article.getAttribute('data-author');
      /* split tags into array */
      const linkHTML = '<a href="#author-' + author +'">' + author+ '</a>';
      console.log(linkHTML);
      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
    }
  };
  generateAuthors();

  const authorClickHandler = function(event){
  /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeAuthors) {
    /* remove class active */
      activeAuthor.classList.remove('active');
    }/* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
    /* add class active */
      authorLink.classList.add('active');
    } /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author +'"]');
  };

  const addClickListenersToAuthors = function(){
  /* find all links to tags */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author"]');
    /* START LOOP: for each link */
    for (let linkToAuthor of allLinksToAuthors) {
    /* add tagClickHandler as event listener for that link */
      linkToAuthor.addEventListener('click', authorClickHandler);
    }

  /* END LOOP: for each link */
  };

  addClickListenersToAuthors();
}




























