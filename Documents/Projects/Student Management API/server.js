let express = require("express")
let app = express()
let port = 3000
let fs = require("fs")
let students = require("./students");
app.get("/",(req,res)=>{
    res.send("<h1>Student API is running 🚀</h1>")
})
app.use(express.json());
app.get("/students",(req,res)=>{
    res.json(students);
})
app.get("/students/:id",(req,res)=>{
    const id = Number(req.params.id); 
    const student = students.find(s=>s.id === id);//you can also use this version where you don't have to check if the id is a strin or not.This works too (const student = students.find(s => s.id == req.params.id);)

    if(!student) {
        res.send("Students not Found");
    }else{
        res.send(student);
    }
})

app.post("/students",(req,res)=>{
    const {name,age} = req.body;
    
    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age
    };
    students.push(newStudent);
    res.send(newStudent);
})

app.put("/students/:id",(req,res)=>{
    const student = students.find(s=>s.id == req.params.id)

    if(!student){
        res.send("Student not found!");
    }else{
        student.name = req.body.name || student.name;
        student.age = req.body.age || student.age;
        res.send(students);
    } 
})

app.delete("/students/:id",(req,res)=>{
    const id = Number(req.params.id);
    const index = students.findIndex(s=>s.id == id)
    if(index === -1){
        res.send("student not found ");
    }else{
        students.splice(index,1)
        res.send("Student deleted successfully!")
        res.send(students)
    }
})

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})



