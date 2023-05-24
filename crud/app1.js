const express=require('express');
const app=express();
const mongoose=require('mongoose');
const student=require('./model');
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const link = 'mongodb://localhost:27017/student'
mongoose
  .connect(link)
  .then(function (db) {
    console.log('Connected to MongoDB')
  })
  .catch(function (err) {
    console.log('Error connecting to MongoDB', err)
  })

//   var studentSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     rollno:{
//         type:Number,
//         required:true,
//         max:83,
//         min:1
//     },
//     wad:{
//         type:Number,
//         required:true,
//         max:100,
//         min:0
//     },
//     cc:{
//         type:Number,
//         required:true,
//         max:100,
//         min:0
//     },
//     dsbda:{
//         type:Number,
//         required:true,
//         max:100,
//         min:0
//     },
//     cns:{
//         type:Number,
//         required:true,
//         max:100,
//         min:0
//     }
// });
//const model=mongoose.model('model',studentSchema);   // MODEL

// Base FrontEnd
app.get('/',(req,res)=>{
    res.render("index.ejs");
})
app.post('/addStudent',(req,res)=>{
    var stud=new student(req.body);
    stud
    .save()
    .then(()=>{
      console.log(stud);
      res.render("index.ejs");
    })
    .catch((err)=>{
        //res.render("E:/NodeJS/student_practice/error.ejs");
        res.json({"error":err});
    });
});

//Get the number of records
 app.get('/getStudent',(req,res)=>{
  student.find({})
  .then(records=>{
  student.countDocuments()
  .then(count => {
    // Serialize count into JSON
    const data = {
      count: count,
      records: records
    };

    // Send JSON response to the frontend
    res.json(data);
  })
  .catch(err => {
    console.error('Error retrieving count:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  });
})

app.post('/deleteStudent',(req,res)=>{
  let id=req.body.Roll_No;
  student.deleteOne({"Roll_No":id})
  .then(()=>{
    console.log("Deleted");
    res.render("index.ejs");
  })
  .catch((err)=>{
    res.json({"error":err});
  });

});
app.post('/updateStudent',(req,res)=>{

});
app.listen(3000,()=>console.log('Server started'));