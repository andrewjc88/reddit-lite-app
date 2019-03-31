
export const async getRedditFeed = () => {
  // async function fetchNav() {
  try {
    let response = await fetch('/api/nav.json');
    let reponseObj = await response.json();
    let navItems = reponseObj.items;

    this.populateNav(navItems);

  } catch (err) {
    alert('Failed to fetch navigation')
  }
  // }
}
