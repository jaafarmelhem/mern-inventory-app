This is a simple inventory app built on MERN technologies.

To run the app

run the following commands at the same time

nodemon server,
in the folder back end, to start the back end, containing the expressjs server and the mongo db database


mongo -->>
use devices (name of the database) , 
in the folder data/db, to switch to the specified mongo database


npm start , 
in the folder mern-inventory-app, containing the front end app


and the app will start at http://localhost:3000/

right now, I follow the tutorial https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
in implementing OAuth2