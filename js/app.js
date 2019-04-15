
'use strict'

const feeds = [
  {
    name: 'Frontend',
    url: 'frontend.json'
  },
  {
    name: 'Workers rights',
    url: 'workersrights.json'
  },
  {
    name: 'Ethical Hacking',
    url: 'ethicalhacking.json'
  }
]

function init() {

  createHeaderNav();
  getRedditStories(getSelectedFeed());

  setInterval(() => getRedditStories(getSelectedFeed()), 60000);
};

function getSelectedFeed() {
  let selectedFeed = 0;

  if (localStorage.selectedFeedIdx) {
    selectedFeed = feeds[localStorage.selectedFeedIdx];
  }

  return selectedFeed;
}

function createHeaderNav() {
  const headerNode = document.createElement("div");
  const navList = document.createElement("div");
  const headerTitle = document.createElement("h1");

  navList.className = "nav-list"
  headerNode.className = "header";
  headerTitle.innerHTML = "Reddit Lite";

  feeds.forEach(selectedFeed => {
    const navItem = document.createElement("div");
    const navItemTitle = document.createElement("span");

    navItemTitle.innerHTML = `${selectedFeed.name}`;
    navItem.addEventListener("click", () => changeSelectedFeed(selectedFeed), false)

    navItem.appendChild(navItemTitle)
    navList.appendChild(navItem)
  })

  headerNode.appendChild(headerTitle);
  headerNode.appendChild(navList);
  document.body.appendChild(headerNode);
}

function changeSelectedFeed(selectedFeed) {
  const selectedFeedIdx = feeds.indexOf(selectedFeed);

  getRedditStories(selectedFeed);
  localStorage.setItem("selectedFeedIdx", selectedFeedIdx);
  localStorage.setItem("scrollPosition", 0);
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

  storiesSection.innerHTML = "";

  if (storiesSection) {
    feedItems.forEach(feedItem => {
      storiesSection.appendChild(createStoryCard(feedItem.data));
    });
  }

  if (window.scrollY !== scrollPosition) {
    document.documentElement.scrollTop = document.body.scrollTop = localStorage.getItem("scrollPosition")
  }
}

async function getRedditStories(feed) {
  try {
    let response = await fetch(`https://www.reddit.com/r/${feed.url}`);
    let reponseObj = await response.json();
    let feedItems = reponseObj.data.children;

    populateFeed(feedItems);

  } catch (err) {
    alert('Failed to fetch reddit stories. ' + err);
  }
}

function saveScrollPosition() {
  const scrollPosition = window.scrollY;
  localStorage.setItem("scrollPosition", scrollPosition);
}

window.addEventListener("unload", function () {
  saveScrollPosition();
});

window.addEventListener("load", function () {
  init();
});
