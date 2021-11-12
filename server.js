
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
const  sql = require('mssql');
var Student = require('./student');
const dboperations = require('./dboperations');
const { response } = require('express');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})


// Get Students Data 
router.route('/students').get((request,response)=>{

    dboperations.getStudents(request).then(result => {
       response.json(result[0]);
    })

})


// Get Students Id 
router.route('/students/:id').get((request,response)=>{

    dboperations.getStudent(request.params.id).then(result => {
       response.json(result[0]);
    })

})

// Post Data
router.route('/students').post((request, response) => {
   console.log(request.body)
   let  data = { ...request.body }
   dboperations.addStudents(data).then(data  => {
     response.status(201).json(data);
   })
 })


// Update

 router.route('/students/:id').post((request, response) => {
   console.log(request.body)
   let  data = { ...request.body }
   dboperations.updateStudent(data).then(data  => {
     response.status(201).json(data);
   })
 })



 router.route('/students/:id').delete((request, response) => {
   console.log(request.body)
   let  data = { ...request.body }
   dboperations.deleteStudent(data).then(data  => {
     response.status(201).json(data);
   })
 })


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Student API is runnning at ' + port);


