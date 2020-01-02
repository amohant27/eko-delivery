
# Name
Eko Delivery-Checkout Services


## Description
The Eko Delivery is a Web application  help their customers  to  define the delivery route by themselves. They can construct it by choosing multiple routes between two towns that Eko provided. The delivery cost is equal to the summation of these routes that they chose. Each routes in the list is only ‘one-way’, That is, a route from town A to town B does not imply the existence of a route from town B to town A. Even if both of these routes do exist, they are distinct and are not necessarily have the same cost.

### Installation
In the project directory, run:
`cd eko-delivery`
`npm install`


### Starting server
`npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser. 

### Prerequisites
NodeJS
You  need to install NodeJS and npm dependencies for app to work. The app was developed with the latest NodeJS version which at the moment was v10.7.0, but it should work well with v8.11.3 though wasn't tested extensively.

Open your terminal and navigate to the ./eko-delivery folder then run:

`npm install`
This will install npm dependencies and link eko-delivery app so that it is available in your 

### Problems 

There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

Incase running into build error ,  create .env file
In the code directory, `cp example.env .env`

Open `.env` and change environment variables as necessary. 
`SKIP_PREFLIGHT_CHECK=true`


### Run test
`npm run test`