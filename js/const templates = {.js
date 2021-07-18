const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
const titleClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  console.log('Link was clicked!');

  console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [IN PROGRESS] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');

  console.log(targetArticle);

  /* add class 'active' to the correct article */
};


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = 'authors.list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';
  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */

    /* create HTML of the link */
    //const linkHTML = '"<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>"';

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    console.log(linkHTML);
    /* insert link into titleList */
    titleList.insertAdjacentHTML('afterbegin', linkHTML);

    html = html +linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  /*Debbuging active and cliced article links */
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


}


generateTitleLinks();
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags) {
    console.log(tag + 'is used in ' + tags[tag] + ' times');

    if (params.max < tags[tag]) {
      params.max = tags[tag];
    }

    if (params.min > tags[tag] ) {
      params.min = tags[tag];
    }
  }

  console.log('params: ', params);
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    console.log(article);
    /* find tags wrapper */
    const tagsWrapper =article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    //titleList.innerHTML = '';
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const taglinkHTML = '<li><a href="#tags-' + tag + '">' + tag + '</a></li>';
      console.log(taglinkHTML);
      tagsWrapper.insertAdjacentHTML('afterbegin', taglinkHTML);

      html = html +taglinkHTML;



      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(html);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  //let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagsParam = '';
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:', tagLinkHTML);
    //allTagsHTML += '<li><a class="' + tagLinkHTML + '" href="#tag-' + tag + '"><span>' + tag + '</a>' + '</span></li>';

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    //console.log('tagLinkHTML:', tagLinkHTML);


  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event){
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

function addClickListenersToTags(){
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
    //titleList.innerHTML = '';
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