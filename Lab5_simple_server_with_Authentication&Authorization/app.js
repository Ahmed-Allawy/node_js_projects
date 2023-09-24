const express = require('express');
const userRouter = require('./router/users');
const todoRouter = require('./router/todos');
require('./db');
const port = 3000;
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
app.get('/',(req,res)=>{
 res.send('hello allawy');
});

app.use(['/users','/user'],userRouter);
app.use('/todos',todoRouter);
/// error handler
app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  const handledError = err.statusCode < 500;
  res.status(err.statusCode).send({
    message: handledError ? err.message : "something went wronge",
    errors: err.errors || {}
  });
});

app.listen(port,()=>{
  console.log('server is running');
});
// const {MongoClient} = require('mongodb');
// const uri  = require('./atlas_uri');

// const client = new MongoClient(uri);

// const connectToDB =async ()=>{
// try {
//   await client.connect();
//   console.log("yessssss");
// } catch (error) {
//   console.log(error);
// }
// }

// const main = async()=>{
//   try {
//     await connectToDB();
//     const databaselist = await client.db().admin().listDatabases();
//     console.log(databaselist);
//     databaselist.databases.forEach(db=>console.log(`--${db.name}`));
//   } catch (error) {
//     console.log('nooooooooooooo');
//   }finally{
//     await client.close();
//   }
// }

// main();