This is an Express API POC without the use of a database (a few courses are stored locally in a list)

Routes:
- GET http://localhost:4000/
- GET http://localhost:4000/api/courses
- POST http://localhost:4000/api/courses
- GET http://localhost:4000/api/courses/:id
- PUT http://localhost:4000/api/courses/:id

Uses Joi module for input param validations

Uses express.Router() to separate more specific route to another .js file
