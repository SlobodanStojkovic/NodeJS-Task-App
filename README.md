# NodeJS Task Application

## This Task Application is made using NodeJS and Mongoose library. Other libraries used are:
- validator

### To run this application:

1. Clone project repository
2. Make .env file with required informations (see bellow)
3. Run `npm install` from terminal
4. Connect to mongodb database
5. Define specific set of actions that you want the app to do, such as create, read, update od delete tasks
6. Run `npm run dev` from terminal

### Legend:
REST API - Representational State Transfer - Application Programming Interface (REST API or RESTful API)

.env file contents

PORT=3000 //or any other port where you want to run this app locally
SEND_EMAILS_API_KEY=""  //insert your api key
MONGODB_URL=""  //insert mongodb url
MONGODB_URL_TEST=""  //insert mongodb url for testing database
JWT_SECRET="" //insert your secret key here