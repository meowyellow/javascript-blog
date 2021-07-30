'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  templateAuthorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
};

const articleSelector = '.post',
  titleSelector = '.post-title',
  titleListSelector = '.titles',
  tagsSelector = '.post-tags .list',
  tagsListSelector = '.tags.list',
  tagLinksSelector = '.post-tags a, .tags a',
  authorSelector = '.post-author',
  authorListSelector = '.authors.list',
  cloudClassCount = 4,
  consoleFunctionStyle = 'background: #000; font-weight: 700; color: #fff;';
{
  const titleClickHandler = function (event) {
    console.log('%c function titleClickHandler called', consoleFunctionStyle);
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] Remove class 'active' from all links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      console.log('function titleClickHandler remove activeLink: ', activeLink);
    }

    /* [DONE] Add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement: ', clickedElement);

    /* [DONE] Remove class 'active' from all active articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      console.log('function titleClickHandler remove activeArticle: ', activeArticle);
    }

    /* [DONE] Pick 'href' attribute from the clicked link */
    const linkAddress = clickedElement.getAttribute('href').replace('#', '');
    console.log('pick "href" attribute from ckickedElement: ', linkAddress);

    /* [DONE] Match 'href' attribute with id of article */
    const activeArticle = document.getElementById(linkAddress);
    console.log('match activeArticle ID with "href" attribute of active link: ', activeArticle);

    /* [DONE] Add class 'active' to the selected article */
    activeArticle.classList.add('active');
  };

  const generateTitleLinks = function (customSelector = '') {
    console.log('%c function generateTitleLinks called ', consoleFunctionStyle);

    /* [DONE] remove links upon refresh */
    let titleList = document.querySelector(titleListSelector);
    titleList.innerHTML = '';
    console.log('titleList innerHTML: ', titleList.innerHTML);

    /* [DONE] for each article */
    const articles = document.querySelectorAll(articleSelector + customSelector);
    console.log('articleSelector + customSelector: ', articleSelector + customSelector);

    for (let article of articles) {
      /* [DONE] write its ID to a const */
      const articleID = article.getAttribute('id');

      /* [DONE] find an element containing acticle's title and write it to a
      const */
      const articleTitle = article.querySelector(titleSelector).innerHTML;

      /* [DONE] generate html code of a link and append it to a variable */
      const articleLinkData = { id: articleID, title: articleTitle };
      const articleLink = templates.articleLink(articleLinkData);

      titleList.innerHTML += articleLink;
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  const calculateTagsParams = function (tags) {
    console.log('%c function calculateTagsParams called', consoleFunctionStyle);

    /* [DONE] loop over values of argument */
    let numberOfOccurences = [];
    for (const tag in tags) {

      /* [DONE] append values to a list */
      numberOfOccurences.push(tags[tag]);
    }

    /* [DONE] find maximum and minimum in a list */
    let tagsParams = {};
    tagsParams['min'] = Math.min(...numberOfOccurences);
    tagsParams['max'] = Math.max(...numberOfOccurences);
    console.log('numbers of tags occurences: ', tags);

    return tagsParams;
  };

  const calculateTagClass = function (count, tagsParams) {
    console.log('%c function calculateTagClass called', consoleFunctionStyle);

    /* [DONE] set default tag class number for count = tagsParams[min] */
    let tagClassNumber = 1;

    /* [DONE] if count is not equal to tagsParams.min calculate tagClassNumber */
    if (count !== tagsParams.min) {
      tagClassNumber = Math.round(count * cloudClassCount / tagsParams.max);
    }

    console.log('tagClassNumber: ', tagClassNumber);
    return tagClassNumber;
  };

  const generateTags = function () {
    console.log('%c function generateTags called ', consoleFunctionStyle);

    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(articleSelector);

    /* [DONE] for each article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(tagsSelector);

      /* [DONE] make tagLinks variable with empty string */
      let tagLinks = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const tagsArray = articleTags.split(' ');
      console.log('tagsArray: ', tagsArray);

      /* [DONE] for each tag */
      for (let tag of tagsArray) {

        /* [DONE] generate HTML of the link */
        const tagLinkData = { id: tag };
        const tagLink = templates.tagLink(tagLinkData);

        /* [DONE] append generated code to tagLinks variable */
        tagLinks += tagLink;
        console.log('tagLinks: ', tagLinks);

        /* check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* add new tag to allTags object */
          allTags[tag] = 1;
        }
        else {
          allTags[tag]++;
        }
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = tagLinks;
      console.log('html var: ', tagsWrapper.innerHTML);
    }

    /* [DONE] find list of all tags in right column */
    const tagList = document.querySelector(tagsListSelector);
    console.log('tagList: ', tagList);

    /* [DONE] add code from allTags to tagList */
    const tagsParams = calculateTagsParams(allTags);
    console.log('function calculateTagsParams returned tagsParams: ', tagsParams);

    /* [DONE] declare object with tags data */
    const allTagsData = { tags: [] };

    /* [DONE] for each tag */
    for (let tag in allTags) {
      console.log('tagHTML: ', tag);

      /* [DONE] populate tags list with data */
      allTagsData.tags.push({ tag: tag, count: allTags[tag], className: calculateTagClass(allTags[tag], tagsParams) });
    }

    /* [DONE] generate HTML from tag cloud template to tagList.innerHTML */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData: ', allTagsData);
  };

  const generateAuthors = function () {
    console.log('%c function generateAuthors called ', consoleFunctionStyle);

    /* [DONE] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(articleSelector);

    /* [DONE] for each article */
    for (let article of articles) {

      /* [DONE] find authorWrapper */
      const authorWrapper = article.querySelector(authorSelector);

      /* [DONE] extract author-tag attribute from authorWrapper */
      let author = article.getAttribute('author-tag');
      console.log('author-tag attribute: ', author);

      /* [DONE] generate HTML of the link */
      const authorLinkData = {
        author_name: author
      };
      const authorLink = templates.authorLink(authorLinkData);

      /* [DONE] check if authorLink is NOT already in allAuthors */
      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      }
      else {
        allAuthors[author]++;
      }

      /* [DONE] insert HTML of author link into authors wrapper */
      authorWrapper.innerHTML = authorLink;
      console.log('authorWrapper.innerHTML: ', authorWrapper.innerHTML);
    }
    console.log('allAuthors: ', allAuthors);

    /* [DONE] find a list of all authors in right column */
    const authorList = document.querySelector(authorListSelector);
    console.log('authorList: ', authorList);

    const allTAuthorsData = { authors: [] };

    /* [DONE] for each author */
    for (const author in allAuthors) {
      console.log('author: ', author);

      /* [DONE] populate authors list with data */
      allTAuthorsData.authors.push({ author: author, count: allAuthors[author] });
    }

    /* [DONE] add HTML from allAuthorsHTML to authorsList.innerHTML */
    authorList.innerHTML = templates.templateAuthorListLink(allTAuthorsData);
    console.log('allAuthorsData: ', allTAuthorsData);

  };

  const tagClickHandler = function (event) {
    console.log('%c function tagClickHandler called ', consoleFunctionStyle
    );
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement: ', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href attribute of clickedElement: ', href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag extracted from href attribute: ', tag);

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll(tagLinksSelector + '.active');
    console.log('activeTags: ', activeTags);

    /* [DONE] for each active tag link */
    for (let activeTag of activeTags) {

      /* [DONE] remove class active */
      activeTag.classList.remove('active');
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const matchingTagsLinks = document.querySelectorAll(tagLinksSelector + '[href="' + href + '"]');
    console.log('matchingTagsLinks: ', matchingTagsLinks);

    /* [DONE] for each found tag link */
    for (let matchingTagsLink of matchingTagsLinks) {

      /* [DONE] add class active */
      matchingTagsLink.classList.add('active');
      console.log('add class active to matchingTagLink: ', matchingTagsLink);
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const authorClickHandler = function (event) {
    console.log('%c function authorClickHandler called ', consoleFunctionStyle);

    event.preventDefault();
    const clickedElement = this;
    console.log('clickedElement: ', clickedElement);

    /* [DONE] find href attribute of clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href attribute of clicked element: ', href);

    /* [DONE] extract author name from href attribute */
    let authorName = href.replace('#author-', '');
    console.log('extracted authorName: ', authorName);

    /* [DONE] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(authorSelector + ' a.active, ' + authorListSelector + ' a.active');
    console.log('activeAuthorLinks selector: ', activeAuthorLinks);

    /* [DONE] for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* [DONE] remove class active */
      activeAuthorLink.classList.remove('active');
      console.log('activeAuthorLink: ', activeAuthorLink);
    }

    /* [DONE] add class active to the clickedElement */
    clickedElement.classList.add('active');

    /* [DONE] find all author articles */
    const authorLinks = document.querySelectorAll(articleSelector + '[author-tag="' + authorName + '"] ' + authorSelector + ' a');

    console.log('authorLinks selector: ', articleSelector + '[author-tag="' + authorName + '"] ' + authorSelector + ' a');

    /* [DONE] for each author article */
    for (let authorLink of authorLinks) {

      /* [DONE] add class active to article link */
      authorLink.classList.add('active');
      console.log('add class active to article link: ', authorLink);
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[author-tag="' + authorName + '"]');

  };

  const addClickListenersToTags = function () {
    console.log('%c function addClickListenersToTags called ', consoleFunctionStyle);

    /* [DONE] find all links */
    let allTagsLinks = document.querySelectorAll(tagLinksSelector + ', ' + tagsListSelector + ' a');

    /* [DONE] for each link add tagClickHandler click listener */
    for (let tagLink of allTagsLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  };

  const addClickListenersToAuthors = function () {
    console.log('%c function addClickListenersToAuthors called ', consoleFunctionStyle);

    /* [DONE] find all links */
    let allAuthorsLinks = document.querySelectorAll(authorSelector + ' a, ' + authorListSelector + ' a');

    /* [DONE] for each link add authorClickHandler click listener */
    for (let authorLink of allAuthorsLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  };

  generateTitleLinks();
  generateTags();
  generateAuthors();
  addClickListenersToTags();
  addClickListenersToAuthors();

}