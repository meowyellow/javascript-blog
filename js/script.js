'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS]  add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list',
  optAuthorClassCount = 5,
  optAuthorClassPrefix = 'author-size-';

/* Function generateTitleLinks */
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

function calculateTagsParams(tags) {
  const params = {
    min: 1,
    max: 5,
  }
  console.log(params);

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('.post');

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + '">' + tag + '</a></li>';
      console.log('link HTML of the Link');

      /* add generated code to html variable */
      html += linkHTML + ' ';

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + ' " href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML');
    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
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

function calculateAuthorsParams(authors) {
  const params = {
    min: 1,
    max: 5,
  }
  console.log(params);

  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');

    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);
  return optAuthorClassPrefix + classNumber;
}

function generateAuthors() {
  console.log(generateAuthors);

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-authors */
    const articleAuthors = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[articleAuthors]) {

      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;

      /* END LOOP: for each tag */
    }
    /* insert HTML to the authorsWrapper */
    authorsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorsParams);

  /* [NEW] create variable for all authors HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each allAuthors: */
  for (let articleAuthor in allAuthors) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = calculateAuthorClass(allAuthors[articleAuthor], authorsParams);
    console.log('authorLinkHTML:', authorLinkHTML);

    allAuthorsHTML += '<li><a href="#author-' + articleAuthor + '" class ="' + authorLinkHTML + '">' + articleAuthor + '</a> ' + allAuthors[articleAuthor] + '</li>';
    console.log(allAuthorsHTML);
  }
  /* [NEW] END LOOP: for each author in allTags: */

  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

/* Dodajemy akcję po kliknięciu w author */
const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tag of tagLinks) {
    tag.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}


const addClickListenersToAuthors = function () {
  console.log(addClickListenersToAuthors);

  /* find all links to Authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();
}
