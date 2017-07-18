# Flutter
### A Twitter Clone
_A project to expand NodeJS and Web Dev. skills_
--- --- --- --- --- --- --- --- --- --- --- ---
#### Libraries used:
+ NodeJS (with ExpressJS, Body-Parser)
+ MongoDB (with MongooseJS)
+ AngularJS (with ngRoute)
+ Bootstrap

#### Goals:
+ Expand knowledge of NodeJS (Vanilla vs ExpressJS)
+ Expand knowledge of MongoDB vs MySQL (dynamic schema vs relational)
+ Expand knowledge of NPM system and Github
+ Creating functioning web-app that clones Twitter's base utilities
+ + includes sign-up/log-in, timeline, profile, post to timeline

#### Lessons Learned:
+ Established a better understanding of what is Vanilla JavaScript and what is a Framework
+ Understand how ExpressJS simplifies and abstracts the core $HTTP system
+ Read/watch various tutorials to understand current standards and approaches to common actions (e.g.,  use config.js, (req, res){}, use IIFE, etc.)
+ Understand when to keep code together/concise and when to modularize for future expansion
+ Better understand how MongoDB stores data [and how to query it]

#### Challenges Faced:
+ Not placing the carriage before the horse (i.e., styling before functionality)
+ Fundamentally understanding routing and implementation between NodeJS/AngularJS
+ Store form data to Database after button press -> better understand MongoDB
+ Front-end design; learning basic Bootstrap so I can minimize time spent on UI
+ Starting/gaining momentum while looking at the project as a whole and having come from working a full time job already 
+ Understand better ng-route and templateUrl,controller
+ Have functions run as soon as page loads and within $interval
+ Dig deeper into how information is passed through functions and between Express and Angular
+ CATCHING TYPOS IN A TIMELY MATTER!

#### Day-2 Thoughts:
+ Modify styling to be responsive with screen sizes (optomize for mobile ?)
+ Place $http requests/etc. into Factories within AngularJS
+ Further security/encryption features

--- --- --- --- --- --- --- --- --- --- --- ---
### Stream of Consciousness:
The first task was to establish a workflow and directory structure for the project. I knew I wanted to use NodeJS and quickly after, I realized I wanted to use MongoDB so I could start to explore that database style as opposed to my usual use of MySQL and relational databases. Once I had that, I also knew I would be using NPM for NodeJS and that I would eventually get this all onto GitHub. Lastly, I realized that I would work to create a Twitter clone and got the name project name Flutter shortly after.  
With that all decided, I created my Flutter/ directory and then touched a README.md, .gitignore, server.js, and index.html. Once that was done, I installed NodeJS, NPM, and Git onto my laptop and ran "npm init" which walked me through my first package.json. I then started reading the NodeJS documentation and walked through the Anatomy of an HTTP Transaction to get a Hello World going. I then spent some time to understand how this worked in pure NodeJS and how to serve up HTML pages via "fs=require('fs')".  
Once I felt that I had enough knowledge of how Node servered pages, I used NPM to install my first dependency, ExpressJS; this helped me hide and manage what I had learned with simplified HTTP functions. I then worked for a bit to makes sure I understood how this abstraction worked, but quickly moved on since it seemed the best way to continue to learn was to build onto the app.  
I then started to look at various YouTube videos about how to use NodeJS with MongoDB and how to create applications. This all moved me swiftly to realizing that I will use AngularJS for the front-end and thus create a MEAN Stack application. I then "npm install mongoose" and added a app/ directory to store the more client side related code and a db/ directory for the more server side code.  
I now had a server.js that initialized a NodeJS server that would listen for GET/POST requests to some urls and then present a webpage/controller associated with the request. With all this fairly stable, I moved on to use the database to CRUD some data, but that hit a wall fairly fast in just the Create/Read part...  
I realized I was not fully aware how data was being passed from the Angular front-end to the Node/Express back-end and then how to save it to MongoDB (which I was using mlab to handle the database portion). I had to step back and dive deeper into some tutorials and the Mongoose and Express documentation. Soon enough, I had a small NodJS sandbox directory where I was testing mongoose actions and make sure I understood how documents/schemas/models worked; once I had this, I moved back to Express and started so see positive results.  
I removed some code styling and paradigms to make sure that I knew what was necessary code and what was optimization or stylistic choices. I also renamed the "app" used in AngularJS and ExpressJS to "anApp" and "exApp", respectively (an=Angular, ex=Epxress) - again, but to a lesser degree, making sure I was grapsing what was being done by Express and what was being done by Angular, though I think that is more intuative.  
I have spent a lot of days redoing huge chunks of my code over and over again to better understand how the pieces work and to try and understand the best way to setup my workspace for readibility and functionality. At first, I felt that I was spinning my wheels, but as I start to really grasps some key concepts, it was time well spent.  
I am starting to get more comfortable with letting go control over all the aspects of my code base and let libraries/frameworks take control; primarily implementing Bootstrap with minimal knowledge at first and just trusting it to do its job.  


