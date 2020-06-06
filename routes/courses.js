const express = require('express');
const Joi = require('joi');
let router = express.Router();

router.use((req, res, next) => {
    //My own personal middleware
    console.log(req.url, "@", Date.now());
    next();
});

//This can be replaced by a DB
const courses = [
    {id: 0, name: "Math"},
    {id: 1, name: "Science"}
];

//Use route params for required values
//Use query string parameters for optional values
// i.e. /api/courses/1?sortBy=name
//req.params;
//req.query;

router.route('/')
    //Create Course
    .post((req, res) => {
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
    })
    //Get all Courses
    .get((req, res) => {
        res.send(courses);
    });


router.route('/:id')
    //Update Course
    .put((req, res) => {
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
    })
    //Get specific Course
    .get((req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course){
            res.status(404).send('The course with the given ID was not found');
            return;
        }
        else{
            res.send(course);
        }
    });

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;