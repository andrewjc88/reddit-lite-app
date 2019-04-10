
'use strict'

function init() {
  createHeader();
  getRedditStories();
  // setTimeout(refreshPage, 60000);
};

function createHeader() {
  const headerNode = document.createElement("div");
  const headerTitle = document.createElement("h1");
  headerNode.className = "header";
  headerTitle.innerHTML = "Reddit Lite";
  headerNode.appendChild(headerTitle);
  document.body.appendChild(headerNode)
}

function refreshPage() {
  document.location.reload(true);
}

function createStoryCard(story) {
  let storyNode = document.createElement('div');
  storyNode.innerHTML =
    `<div class="stories-card">
        <div class="story-card-title-section"> 
          <a  href="${story.url}"><h2>${story.title}</h2></a>
          ${ story.is_reddit_media_domain ?
      `<a href="${story.url}"><img src=${story.thumbnail} alt=${story.title}><img></a>` : ""
    }
        </div>
        ${story.selftext ? `<p>${story.selftext}</p>` : ''}
        <div class="card-links-section">
          <a href=${story.url}>Author: ${story.author}</a>
          <a href=${story.url}>${new Date(story.created).toUTCString()}</a>
          <a href=${story.url}>Comments: ${story.num_comments}</a>
        </div>
      </div>`
  return storyNode
}

function populateFeed(feedItems) {
  const storiesSection = document.getElementById("stories-section");
  const scrollPosition = localStorage.scrollPosition;

  if (storiesSection) {
    feedItems.forEach(feedItem => {
      storiesSection.appendChild(createStoryCard(feedItem.data))
    })
  }

  if (window.scrollY !== scrollPosition) {
    document.documentElement.scrollTop = document.body.scrollTop = localStorage.getItem("scrollPosition")
  }
}

async function getRedditStories() {
  try {
    let response = await fetch(`https://www.reddit.com/r/cats.json`);
    let reponseObj = await response.json();
    let feedItems = reponseObj.data.children;

    populateFeed(feedItems)

  } catch (err) {
    alert('Failed to fetch reddit stories. ' + err)
  }
}

function saveScrollPosition() {
  const scrollPosition = window.scrollY;
  localStorage.setItem("scrollPosition", scrollPosition);
}

window.addEventListener("unload", function () {
  saveScrollPosition()
});
window.addEventListener("load", function () {
  init()
});
