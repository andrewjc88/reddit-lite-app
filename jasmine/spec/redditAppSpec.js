
describe("Reddit Lite app", function () {

  it('has background image', function () {
    expect(window.getComputedStyle(document.body).backgroundImage === 'none').not.toBe(true);
  });

  it('should have header', function () {
    let thing = window.getComputedStyle(document.querySelector('header'))
    console.log(thing)
    expect(document.querySelector("header")).toBe(true);
  });
});

describe("Load stories", function () {

  beforeAll(function (done) {
    getRedditStories().then(
      function () {
        done()
      }
    )
  });

  it('populates stories', function () {
    expect(document.getElementsByClassName("stories-card").length).not.toBe(0)
  });

  it('each card has title and image or body text', function() {

    const storyCards = document.getElementsByClassName("stories-card");
    
  })

});
