# Reddit Lite App

To run this app; clone the repository from https://github.com/andrewjc88/reddit-lite-app to your local hardrive then navigate your browser to index.html.

You may get an error message due to CORS policy blocking your API requests. To resolve this install a CORS enabler on your browser or try navigation to google.com from the app then clicking back into the app to spoof it the browser.

Q) How is your code structured, and why?
A) I structured this app as a SPA with the primary app.js scoped to the app's root scope level for simplicity and convenience when setting up the testing library. Once the app is hosted on a server routing can be configured using the Web History API.

Q) How does updated data change your application’s state?
A) As data is received from the API request each story object is sent to the createStory function to have an HTML node created and then appended to the dom.

Q) In your opinion, what are the pros and cons of how your views are rendered?
A) The pros of using javascript for controlling routing and the dom is there is a layer of security that the javascript can't be as easily spoofed into rendering content it shouldn't. Content load times are also faster with SPA configurations. A con of this method is it will render the app useless to anyone not running javascript on their browser. SEO optimization is also still catching up to dynamically rendered content. 

Q) If you were going to add a feature like a login, how would your app’s architecture change?
A) My app's architecture would stay the same. Once Routing is configured using the Web History API I would have the user store a unique session hash key that would be verified on each API request to the backend.
