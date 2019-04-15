
describe("Reddit Lite app", function () {

  it('has background image', function () {
    expect(window.getComputedStyle(document.body).backgroundImage === 'none').not.toBe(true);
  });
});

describe("Load stories", function () {

  beforeAll(function (done) {
    getRedditStories(feeds[0]).then(
      function () {
        done()
      }
    )
  });

  it('populates stories', function () {
    expect(document.getElementsByClassName("stories-card").length).not.toBe(0)
  });

});
