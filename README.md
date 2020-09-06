This is a Node Express API route on Netlify without the use of a database (a few courses are stored locally in a list)

Routes:
- GET /.netlify/functions/api/courses/
- GET /.netlify/functions/api/courses/<course id>
- POST /.netlify/functions/api/courses/
  (needs json body with "name" attribute)
- PUT /.netlify/functions/api/courses/<course id>
  (needs json body with "name" attribute)

Uses Joi module for input param validations

Uses express.Router() to separate more specific route to another .js file

The name of the js file in /src will be the same as the name of the file in /functions

Uses netlify-lambda and serverless-http
