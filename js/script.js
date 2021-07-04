'use strict'

const titleClickHandler = function (event) {
  const clickedElement = this;
  console.log('Link was clicked!');
  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    console.log(activeArticles);
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const articleChosen = document.querySelector(articleSelector);
  console.log(articleChosen);
  /* add class 'active' to the correct article */
  articleChosen.classList.add('active');

}
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
  
  

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    console.log(optArticleSelector + customSelector);
    for (let article of articles) {
  
      /* get the article id */
      const articleId = article.getAttribute('id');
  
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
      /* get the title from the title element */
  
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  
      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span> , </a> </li>';
      console.log(tagLinkHTML);
      /* add generated code to html variable */
      html = html + tagLinkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    console.log(titleList);
    /* END LOOP: for every article: */
  }
}
generateTags();
function tagClickHandler(event) {
  console.log(tagClickHandler);

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  let html = '';

  for (let activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');


    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {
  console.log(addClickListenersToTags);
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();
generateAuthors();
function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);
    /* find tags wrapper */
    const authorsWrapper =article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
   
    let html = '';
    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    /* insert HTML of all the links into the tags wrapper */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

    authorsWrapper.insertAdjacentHTML('afterbegin', linkHTML);

    html = html + linkHTML;
    /* add generated code to html variable */
    authorsWrapper.innerHTML = html;
    console.log(html);
  /* END LOOP: for every article: */
  }
}
generateAuthors();
function authorClickHandler(event){

  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log('href:', href);

  const author = href.replace('#author-', '');
  console.log('author:', author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#article-"]');
  console.log('activeAuthorLinks:', activeAuthorLinks);

  if (activeAuthorLinks){

    for (let activeAuthor of activeAuthorLinks){

      activeAuthor.classList.remove('active');

    }
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let author of authorLinks){

    author.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let author of authorLinks){

    author.addEventListener('click', authorClickHandler);

  }

}

addClickListenersToAuthors();