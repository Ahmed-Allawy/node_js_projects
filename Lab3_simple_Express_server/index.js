const express = require('express');
const fs = require('fs');
const writeToFile = require('./writeToFile');
const { type } = require('os');
const app = express();

// Custom middleware
const requestLogger = (req, res, next) => {
  const { method, url } = req;
  const currentTime = new Date().toLocaleString();
  console.log(`[${currentTime}] ${method} ${url}`);
  next();
};
// Applying the middleware globally
app.use(requestLogger);
app.use(express.json());

const port = 3002;

const userDBPath = '/home/allawy/Desktop/node_js_projects/Lab3_simple_Express_server/userDB.json'
const dbPath = '/home/allawy/Desktop/node_js_projects/to-do_cli/db.json'

////// routings/////
app.post('/register', (req, res) => {
  const { username, password, firstname } = req.body;
 
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
  loggedIn = false;
  const user = {
    username,
    password,
    firstname,
    loggedIn
  }

  fs.readFile(userDBPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
    data.push(user);
    writeToFile(userDBPath,data,'{message:”user was registered successfully”}',fs,res);
  });
}); /////register route

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(userDBPath, 'utf8', (err, data) => {
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
      writeToFile(userDBPath,data,'{message:”user was logged in successfully”}',fs,res);
      res.status(200).json({ message: 'Logged in successfully', profile: { name: username } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

});

//// return to-do list
app.get('/todos', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.end(data);
  });

});


// add to-do route
app.post('/todos', (req, res) => {
  const { username, title } = req.body;
 
  fs.readFile(userDBPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    data = JSON.parse(data);
    // Find user by username
    const user = data.find(user => user.username === username);

    if (user && user.loggedIn === true) {
    
      fs.readFile(dbPath, 'utf8', (err, dbdata) => {
        if (err) {
          console.error(err);
          return;
        }
     
        dbdata = JSON.parse(dbdata);
        const newEntry = {
          id: dbdata[dbdata.length-1].id + 1,
          title: title,
          status: 'to-do',
          owner: username
        }
        dbdata.push(newEntry);
        writeToFile(dbPath,dbdata,'{message:”todo created successfully”}',fs,res);
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

});


// delete to-do route
app.delete('/todos/:id', (req, res) => {
  // Get the ID from the request parameters
  const str = req.params.id;
  const id = /\d+/g.exec(str)[0];

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
    // Find todo by id
    const todoIndex = data.findIndex((todo) => todo.id == id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    // Delete the todo from the array
    data.splice(todoIndex, 1);
    writeToFile(dbPath,data,'{message:”todo deleted successfully”}',fs,res);
  });
});


// edit to-do route
app.patch('/todos/:id', (req, res) => {
  const { title, status } = req.body;
  // Get the ID from the request parameters
  const str = req.params.id;
  const id = /\d+/g.exec(str)[0];

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
    // Find todo by id
    const todoIndex = data.findIndex((todo) => todo.id == id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    // edit the todo
    data[todoIndex].title = title;
    data[todoIndex].status = status;
    writeToFile(dbPath,data,'{message:”todo edited successfully”}',fs,res);
  });
});
// Routes
app.get('/', (req, res) => {
 res.end("Hello Allawy");
});
app.listen(port, () => {
  console.log('server is running');
});