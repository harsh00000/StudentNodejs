var  config = require('./db');
const  sql = require('mssql');
const { query, request } = require('express');
const Students = require('./student');



// Get Students Data 

async  function  getStudents() {
    console.log("Get Students Data Succesfully >>>>>")
    try {
      let  pool = await  sql.connect(config);
      let  students = await  pool.request().query("SELECT * from Students");
      return  students.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


// Get Students Id  


  async  function  getStudent(StudentId) {
    console.log("Get Id ");
    try {
      let  pool = await  sql.connect(config);
      let  student = await  pool.request()
      .input('input_parameter', sql.Int,StudentId)
      .query("SELECT * from Students where Id = @input_parameter");
      return  student.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

// Insert Students

async function addStudents(data){
  console.log("Data Added Successfully >>>>>");
  try{
    let pool = await sql.connect(config);
    let student = await pool.request()
    .input('id', sql.Int, data.id)
    .input('firstname',sql.NChar,data.firstname)
    .input('lastname',sql.NChar,data.lastname)
    .query("INSERT INTO Students(id,firstname,lastname)VALUES(@id,@firstname,@lastname)");

    return student.recordsets;
  } catch (err) {
      console.log("Not Add Student>>>>>>");
    } 
}

// Update Student 

async function updateStudent(data){
  console.log(data,"Data Updated Successfully >>>>>");
  try{
    let pool = await sql.connect(config);
    let student = await pool.request()
    .input('id', sql.Int,data.id)
    .input('firstname',sql.NChar,data.firstname)
    .input('lastname',sql.NChar,data.lastname)
    .query("UPDATE Students SET firstname = @firstname,lastname=@lastname WHERE id=@id");

    return student.recordsets;
  } catch (err) {
      console.log("Not Update  Student Data>>>>>>");
    } 
}


// Delete Student 
async function deleteStudent(data){
  console.log("Data Delete Successfully >>>>>");
  try{
    let pool = await sql.connect(config);
    let student = await pool.request()
    .input('id', sql.Int, data.id)
    .input('firstname',sql.NChar,data.firstname)
    .input('la  stname',sql.NChar,data.lastname)
    .query("DELETE FROM Students WHERE id = @id");

    return student.recordsets;
  } catch (err) {
      console.log("Not Delete Student>>>>>>");
    } 
}


module.exports = {
   getStudents:getStudents,
   getStudent:getStudent,
   addStudents:addStudents,
   deleteStudent:deleteStudent,
   updateStudent:updateStudent
  
}  