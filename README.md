
#Name
Eko Delivery-Checkout Services


#Description
The Eko Delivery is a Web application  help their customers  to  define the delivery route by themselves. They can construct it by choosing multiple routes between two towns that Eko provided. The delivery cost is equal to the summation of these routes that they chose. Each routes in the list is only ‘one-way’, That is, a route from town A to town B does not imply the existence of a route from town B to town A. Even if both of these routes do exist, they are distinct and are not necessarily have the same cost.

#Installation
In the project directory, run:
 cd eko-delivery
 --npm install
In the code directory, `cp example.env .env`

Open `.env` and change environment variables as necessary. 

#Prerequisites
NodeJS
You  need to install NodeJS and npm dependencies for app to work. The app was developed with the latest NodeJS version which at the moment was v10.7.0, but it should work well with v8.11.3 though wasn't tested extensively.

Open your terminal and navigate to the ./eko-delivery folder then run:

npm install && npm link
This will install npm dependencies and link eko-delivery app so that it is available in your 

#Problems 


There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.41.2"

Don't try to install it manually: your package manager does it automatically.
However, a different version of webpack was detected higher up in the tree:

  /Users/ananya/node_modules/webpack (version: 4.29.5)

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.

To fix the dependency tree, try following the steps below in the exact order:

  1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
  2. Delete node_modules in your project folder.
  3. Remove "webpack" from dependencies and/or devDependencies in the package.json file in your project folder.
  4. Run npm install or yarn, depending on the package manager you use.



Incase running into build error ,  create .env file
SKIP_PREFLIGHT_CHECK=true

#Starting server
npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

#Run test
npm run test