const express = require("express");
const mysql = require("mysql")
const cors = require("cors")
const app = express();
const multer = require('multer')
app.use(cors());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_react"
})


////file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});

//image filter
// const isImage=(req,file,cb)=>{
//   if(file.mimetype.startWidth("image")){
//     cb(null,true)
//   }else{
//     cb(null,Error("only image allowed"))
//   }
// }

const upload = multer({ storage: storage })

//Create DATA From Reqest Body
app.post("/signup", upload.array('photo', 5), (req, res, next) => {
  let arr = req.files.map((item) => {
    return item.filename
  })
  const newarr = arr.join(',');
  // let langArr = req.body.language;
  // const langArrNew = langArr.join(',');

  console.log(req.body.language)
  let post = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    occupation: req.body.occupation,
    language: req.body.language,
    photo: newarr

  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Could not create User" });
    }
    //console.log(result);
    // res.json({ success: true, message: "New User added",data:"result" });
    ///res.send(result.data.data)
    if (err) {
      result = [{ Status: "Error", Error: " Contact Administrator.", ErrorDetails: error.message }];
    } else {
      result = [{ status: "Success", data: JSON.stringify(result.insertId), user: { name: post.name, email: post.email } }];
    }
    res.json(result);
  });
});


app.post("/signup2", upload.array('photo', 5), (req, res, next) => {
  console.log(req.files)
  let arr = req.files.map((item) => {
    return item.filename
  })
  const newarr = arr.join(',');
  //let langArr = req.body.language;
  //const langArrNew = langArr.join(',');
  let post = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    language: req.body.language,
    occupation: req.body.occupation,
    gender: req.body.gender,
    photo: newarr,

  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      res.json({ success: false, message: "Could not create User" });
    }
    //console.log(result);
    // res.json({ success: true, message: "New User added",data:"result" });
    ///res.send(result.data.data)
    if (err) {
      result = [{ Status: "Error", Error: " Contact Administrator.", ErrorDetails: err.message }];
    } else {
      result = [{ status: "Success", data: JSON.stringify(result.insertId), user: { name: post.name, email: post.email } }];
    }
    res.json(result);
  });
});




app.post("/login", (req, res) => {
  //res.send(req.body);
  db.query('SELECT name,email,id,photo FROM users WHERE email = ?', req.body.email, function (err, result) {
    if (err) {
      result = [{ Status: "Error", Error: " Contact Administrator.", ErrorDetails: err.message }];
    } else {
      result = [{ status: "Success", user: result }];
    }
    res.json(result);
  });

})



app.get("/", (req, res) => {
  res.send("app working");
})


app.listen(5000);