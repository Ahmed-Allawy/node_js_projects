const express = require('express');
const fs = require('fs');
const { type } = require('os');
const app = express();
app.use(express.json());

const port = 3002;

/// database (open,save)///////
const dbPath = '/home/allawy/Desktop/node_js_projects/Lab3_simple_Express_server/userDB.json'
const openDatabase = () =>{
  // fs.readFile(dbPath, 'utf8',(err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(data);
  // }) || '[]'
 
}
const saveToDatabase = (db) => {
  fsFile.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8')
}

//// save user to db/////
const saveUserData= (user)=>{
  console.log(openDatabase());
  // db.push(user);
  // saveToDatabase(db);
  console.log("user was registered successfully");
};
////// routings/////
app.post('/register', (req, res) => {
  const { username, password, firstname } = req.body;
  console.log('palce 1'); 
  // Check if all required attributes are provided
  if (!username) {
    return res.status(422).json({ error: 'Username is required' });
  }
  if (!password) {
    return res.status(422).json({ error: 'Password is required' });
  }
  if (!firstname) {
    return res.status(422).json({ error: 'First name is required' });
  }
  loggedIn=false;
  const user={
    username,
    password,
    firstname,
    loggedIn
  }
 
  fs.readFile(dbPath, 'utf8',(err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
    data.push(user);
    fs.writeFile(dbPath,JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error(err);
      }
      // done!
      res.end('{message:”user was registered successfully”}');
    });
  });
}); /////register route

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(dbPath, 'utf8',(err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
     // Find user by username
  const user = data.find(user => user.username === username);

  if (user && user.password === password) {
    // Update user's loggedIn property
    user.loggedIn = true;
   
    fs.writeFile(dbPath,JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error(err);
      }
      // done!
      res.end('{message:”user was registered successfully”}');
    });
    res.status(200).json({ message: 'Logged in successfully', profile: { name: username } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
  });
 
});


app.get('/',(req,res)=>{
  res.end('hello allawy');
});

app.listen(port,()=>{
  console.log('server is running');
});