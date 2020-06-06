const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

/*
    app.get()
    app.post()
    app.put()
    app.delete()
*/

//This can be replaced by a DB
const courses = [
    {id: 0, name: "Math"},
    {id: 1, name: "Science"}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//Use route params for required values
//Use query string parameters for optional values
// i.e. /api/courses/1?sortBy=name
//res.send(req.params);
// res.send(req.query);
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    else{
        res.send(course);
    }
});

//Create Course
app.post('/api/courses', (req, res) => {

    //Input validations
    const { error } = validateCourse(req.body)
    if (error){
        // 404 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//Update Course
app.put('/api/courses/:id', (req, res) => {
    //Find the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    //Input validation
    const { error } = validateCourse(req.body)
    if (error){
        // 404 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update attribute for the course (could be a DB call)
    course.name = req.body.name;
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// PORT
// Setting an environment variable in terminal
// export <name of variable i.e. PORT>=<variable value i.e. 5000>
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

