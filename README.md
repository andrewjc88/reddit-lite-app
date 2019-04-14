# Reddit Lite App

Q) How is your code structured, and why?
A) I structured this app as a SPA with the primary app.js using the app's root scope level for simplicity and convenience when setting up the testing library. Additional screen's html would be stored in the views folder and routing would show each.

Q) How does updated data change your application’s state?
A) As data is recieved from the api request each story object is sent to the createStory function to have an html node made and then appended to the dom. 

Q) In your opinion, what are the pros and cons of how your views are rendered?
A) 

Q) If you were going to add a feature like login, how would your app’s architecture change?
A) 
