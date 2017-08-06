# Flutter
_Project to create a Twitter Clone to practice the MEAN Stack_
--- --- --- --- --- --- --- --- --- --- --- ---
#### Frameworks/Libraries/etc. used:
+ NodeJS (with ExpressJS, Body-Parser)
+ AngularJS (with ngRoute)
+ MongoDB (with MongooseJS)
+ Bootstrap

#### Goals and Lessons Learned:
+ Create a functioning web-app that clones Twitter's base utilities
  + include: Sign-up/Log-in, Posts/Timeline, Profile Editor, "Like"/"Follow"
+ Expand knowledge of NodeJS (VanillaJS vs NodeJS vs ExpressJS)
  + Gain a better understanding of functions native to JS and what comes from a framework/library
  + Gain a better understanding of JS's HTTP system and how Angular/Express simplifies it
  + Gain a better understanding of Routing/Services/etc. in AngularJS
+ Expand knowledge of MongoDB (Schema Documents vs Relational Tables)
  + Gain an understanding of data is stored documents
  + Gain an understanding of how CRUD works in document databases
  + Gain a sense for using Local/Session Storage, Cookies, and etc.
+ Expand knowledge of project work flows (NPM, Git/GitHub, Deployment)
  + Try to adopt best practices (e.g., use config.js, use IIFE, promises, etc.)
  + Gain a feeling for when to keep code together/concise or to be modular
  + Let go of my resistance to using micro-services and not always "re-inventing the wheel" - though since I am trying to learn, I think it is appropriate here

#### Motivations and Explanation for Current State:
+ First and foremost, I built this all starting from an empty directory; I did not use and boiler plating, I just read all the tutorials of the frameworks/libraries I was using, read/watched tutorials and examples of the various aspects I wanted to implement, and just kept googling and searching Stack Overflow when I would get stuck
+ That being said, I do not want to learn encryption/security on my own, but rather just be taught and told the latest standards; for this reason (and that the site is not meant for production), I have not implemented any real credential testing and I am sure my local User Data storage is not safe
  + I think the greatest security comes from the Open-Source opens that have people consistently testing and improving them and thus, I think this is a feature that should not be fully done in house, but start from the community
+ The styling and formatting is extremely minimal since I am focusing on the flow of data, not necessarily the displaying of it; I did decide to use this as an opportunity to use Bootstrap and learn the basics for use in future endeavors
+ I have not implemented the ability to do Profile Pictures because of the overhead of storing the image and creating a URL for it; currently using hard-coded lorem-pixel to simply this
+ Following/Followers is in serious limbo since I am still learning how to use document based databases and I still think in a relational table paradigm

#### Day-2 Ideas/Needs:
+ Modify styling to be responsive with screen sizes (optimize for mobile)
  + Go through the HTML classes and be more verbose on sizing/layout
+ A11y implementation (i.e., accessibility)
  + Make sure using proper tag attributes and grouping of items
  + Allow for modification of font styling/sizing
  + Incorporate a library that allows for different language selections
+ Further security/encryption features
  + Learn the latest standards in data encryption and how user data is managed
  + Pen-Test and check potential exploits and security concerns
+ Allow for varying profile privacy (e.g., private, friends-only, everyone)
  + Add user property that dictates what can be seen on the profile (ng-if)
+ Implement best practices (e.g., ng-if vs ng-show, direct functions vs promises, etc.)

--- --- --- --- --- --- --- --- --- --- --- ---
#### Stream of Consciousness:
_(General thoughts written down as I was coding)_
The first task was to establish a workflow and directory structure for the project. I knew I wanted to use NodeJS and quickly after, I realized I wanted to use MongoDB so I could start to explore that database style as opposed to my usual use of MySQL and relational databases. Once I had that, I also knew I would be using NPM for NodeJS and that I would eventually get this all onto GitHub. Lastly, I realized that I would work to create a Twitter clone and got the name project name Flutter shortly after.  
With that all decided, I created my Flutter/ directory and then touched a README.md, .gitignore, server.js, and index.html. Once that was done, I installed NodeJS, NPM, and Git onto my laptop and ran "npm init" which walked me through my first package.json. I then started reading the NodeJS documentation and walked through the Anatomy of an HTTP Transaction to get a Hello World going. I then spent some time to understand how this worked in pure NodeJS and how to serve up HTML pages via "fs=require('fs')".  
Once I felt that I had enough knowledge of how Node servered pages, I used NPM to install my first dependency, ExpressJS; this helped me hide and manage what I had learned with simplified HTTP functions. I then worked for a bit to makes sure I understood how this abstraction worked, but quickly moved on since it seemed the best way to continue to learn was to build onto the app.  
I then started to look at various YouTube videos about how to use NodeJS with MongoDB and how to create applications. This all moved me swiftly to realizing that I will use AngularJS for the front-end and thus create a MEAN Stack application. I then "npm install mongoose" and added a app/ directory to store the more client side related code and a db/ directory for the more server side code.  
I now had a server.js that initialized a NodeJS server that would listen for GET/POST requests to some urls and then present a webpage/controller associated with the request. With all this fairly stable, I moved on to use the database to CRUD some data, but that hit a wall fairly fast in just the Create/Read part...  
I realized I was not fully aware how data was being passed from the Angular front-end to the Node/Express back-end and then how to save it to MongoDB (which I was using mlab to handle the database portion). I had to step back and dive deeper into some tutorials and the Mongoose and Express documentation. Soon enough, I had a small NodJS sandbox directory where I was testing mongoose actions and make sure I understood how documents/schemas/models worked; once I had this, I moved back to Express and started so see positive results.  
I removed some code styling and paradigms to make sure that I knew what was necessary code and what was optimization or stylistic choices. I also renamed the "app" used in AngularJS and ExpressJS to "anApp" and "exApp", respectively (an=Angular, ex=Epxress) - again, but to a lesser degree, making sure I was grapsing what was being done by Express and what was being done by Angular, though I think that is more intuative.  
I have spent a lot of days redoing huge chunks of my code over and over again to better understand how the pieces work and to try and understand the best way to setup my workspace for readibility and functionality. At first, I felt that I was spinning my wheels, but as I start to really grasps some key concepts, it was time well spent.  
I am starting to get more comfortable with letting go control over all the aspects of my code base and let libraries/frameworks take control; primarily implementing Bootstrap with minimal knowledge at first and just trusting it to do its job.  
As I expanded profiles and retaining User through a session, I realize that I had only implemented the profile for the case of the user viewing their own profile. So when I visited the profile of a different user, I was presented with the same screen with mutable information; a big no-no. I am now working to create a profile page that is for viewing by not yourself.  
As I continue to modify the current pages to check if a user is logged in or not, I begin to really see the inefficiencies in my implementation (I always knew it was bad, but I am really starting to dig myself in too deep). I am now looking into Angular Services and the notion of saving the current user state/info into this service and inject it into the controllers that I have. -- I am also thinking of doing a service to handle passing data/messages between controllers, but I doubt that is the best approach.  
While adding in the User Service, I started to think more about the URIs I was using and decided to change the server side calls a bit to make it more uniform and possibly API-ish (e.g., /profile/:username -> /user/:username, /addUser -> /user/add, etc.)  
At this point, I now have a website/webapp that allows a user to sign-up/log-in, view a timeline of all Fluts, got to profiles of specific users that will show only their Fluts, and the ability to log-off. There is definitely a lot that needs to be cleaned up and I still need to make "liking" a Flut persistent in the DB, but I think it will hold up as I move to the next item: allowing a user to modify their own profile.  
The extreme basics of the site appear done, but serious work needs to be done to make sure User-Data is persistent and updates properly.  
As I start to tackle the "follow a user" feature, I realize that it is a lot more complex than I originally thought. I have to figure out how to push/remove objects to the arrays stored as a property of the user, specfically doing that within the database. I not only have to do that for the logged-in user, but update the user that is being followed, to show that the logged-in user is **following** them. As I push forward, I think I will refactor this such that follow[ing|ers] is not _{users: [], count: INT}_, but rather just _users: []_ and remove _count_ and just use _.length_ where count was used before... Still fiddling with it and try to figure out an implementation that feels right.  
