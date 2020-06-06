const express = require('express');

const app = express();
app.use(express.json());

//use the things.js file to handle endpoints that start with /things
const API_COURSES  = require("./routes/courses");
app.use("/api/courses/", API_COURSES);

//Handle root
app.get('/', (req, res) => {
    res.send('Hello World');
});

// PORT
// Setting an environment variable in terminal
// export <name of variable i.e. PORT>=<variable value i.e. 5000>
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
