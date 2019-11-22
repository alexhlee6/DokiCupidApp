# DokiCupid 

[See it Live](https://dokicupid.herokuapp.com/)

Welcome to DokiCupid, a dating app designed for anime characters!

DokiCupid is a clone of the popular dating site OkCupid. 
This project features user profiles, matchmaking, filtered search, and instant-messaging between users. 

This application utilizes Rails and Postgres on the back-end, and React/Redux to manage the front-end. 


![alt text](https://dokicupid-seeds.s3-us-west-1.amazonaws.com/splash.png)



## Homepage (Doubletake)
After logging in, users are greeted with the doubletake page which displays profile previews for users that the current user has not yet matched with. Users can see their match percentage with each displayed user and have the option to visit that user's profile. 

![alt text](https://dokicupid-seeds.s3-us-west-1.amazonaws.com/homepage.png)



## Explore and Search
The explore page gives previews of all user profiles for users who are not yet matched with the current user, along with the distance from and compatibility rating with each user. 

The search page allows a user to filter prospective matches by tags including specific personality traits, gender identification, and what the other user is "looking for" on this app. Multiple tags may be specified at one time, and the results will display users that meet all of these requirements. Users can also choose to sort these results by compatibility percentage in increasing or decreasing order.

![alt text](https://dokicupid-seeds.s3-us-west-1.amazonaws.com/explore_search.png)



## User Profiles 
When visiting one's own profile page, a user can choose to view, edit, or delete their profile. When editing, users can also attach more photos for their profile or delete any existing photos.

When users visit other users' profiles, they can "like", or request to be matched with, the user they are viewing. If the requested user chooses to "like" them back, a match is created which allows the two users to send messages to one another. 

![alt text](https://dokicupid-seeds.s3-us-west-1.amazonaws.com/profile_page_2.png)



## Technologies Used
1. Javascript
2. Ruby on Rails
3. PostgreSQL 
4. HTML 
5. CSS/SCSS 

## Libraries:
1. React.js
2. Redux 
3. Rails ActionCable for instant-messaging
3. jQuery for AJAX API requests
4. AWS S3 buckets for user avatar and profile photos 
5. BCrypt for User Authentication
6. NPM zipcodes to calculate distance between users
