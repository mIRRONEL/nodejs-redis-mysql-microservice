# nodejs-redis-mysql-microservice
This is a simple microservice project build with react js, node, redis and mysql. It takes two value from user and stores it to redis and mysql, when api server receives GET request first it checks into redis server if data is not available their then it goes for mysql server.

# Build front end,
npx create-my-app my-app
cd my-app
copy all line of code from App.js file into src/App.js file
copy server.js file into my-app/ folder

# Install dependency 
npm install
npm install mysql express redis cors 

# Start Service
node server.js
npm start

