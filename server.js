const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

 
mongoose.connect("mongodb://127.0.0.1:27017/studentBD")
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error connecting to database:", error));

 
const studentSchema = new mongoose.Schema({
  "name": { type: String, required: true },
  "RollNo": { type: String, required: true },
  "section": { type: String, required: true }
});
 
const students = mongoose.model("student2", studentSchema);
 
app.get('/students', (req, res) => {
  students.find()
    .then((studentsList) => {
      res.status(200).json(studentsList);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving students", error });
    });
});
 
app.use(express.json());
app.post('/studentAdd', (req, res) => {
  const { name, RollNo, section } = req.body;

  const newStudent = new students({
    name,
    RollNo,
    section
  });

  newStudent.save()
    .then(() => {
      res.status(201).json({ message: "Student added successfully", student: newStudent });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error adding student", error });
    });
});
 
app.delete('/deleteStudent', (req, res) => {
    const { RollNo } = req.body;
  
    students.findOneAndDelete({ RollNo })
      .then((deletedStudent) => {
        if (!deletedStudent) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting student", error });
      });
  });
 

  app.put('/student/:RollNo', (req, res) => {
    const { RollNo } = req.params;
    const { name, section } = req.body;
  
    students.findOneAndUpdate({ RollNo }, { name, section }, { new: true })
      .then((updatedStudent) => {
        if (!updatedStudent) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error updating student", error });
      });
  });
 
app.listen(2000, () => {
  console.log("Server is running on port 2000");
});


//mongodb://localhost:27017/studentDB




















  

