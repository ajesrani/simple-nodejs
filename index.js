const express = require('express');
const app = express();
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const { courseValidation } = require('./validation');

// Middlewares
app.use(express.static('public'))
app.use(express.json());
/*app.use('/', () => {
    console.log('This is middleware running');
});*/
app.use((req, res, next) => {
    console.log(`${new Date().toString()} :: ${req.originalUrl}`)
    next()
})


let courses = [
    { id: 1, name: 'course1', description: 'C' },
    { id: 2, name: 'course2', description: 'Java' }
];

app.get('/', (req,res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req,res) => {
    let course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) {
        // 404 Resource not found
        res.status(404).send('No course found');
        return;
    }
    res.send(course);
    //res.send(req.query);
});

//POST create new
app.post('/api/courses', (req,res) => {
    //const {error} = courseValidation(req.body);
    const result = validate(req.body);
    if(result.error) {
        //res.status(400).send(result.error);
        res.status(400).send(result.error.details[0].message);
        return;
    } 
    
    /*if(!req.body.name || req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is mandatory');
        return;
    }*/

    const course = {
        id: courses.length + 1, 
        name: req.body.name,
        description: req.body.description
    };
    const courseUUID = { ...course, uuid: uuidv4()}    // spread operator
    courses.push(courseUUID);
    res.send(courseUUID);
});


//PUT completely override
app.put('/api/courses/:id', (req,res) => {
    let course = courses.find(c => c.id == parseInt(req.params.id));
    course = req.body;
    res.send(course);
});

//PATCH partially modify
app.patch('/api/courses/:id', (req,res) => {
    const { name, description } =  req.body;

    let course = courses.find(c => c.id == req.params.id);
    if( name ) course.name = name;
    if( description ) course.description = description;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    //let course = courses.find(c => c.id == parseInt(req.params.id));
    //const index = courses.indexOf(course);
    //courses.splice(index, 1);
    const { id } = req.params;
    courses = courses.filter((course) => course.id != id);
    res.send(courses);
});

function validate(course) {
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().required()
    };
    const result = Joi.validate(course, schema)
    //console.log(result);
    return result;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
