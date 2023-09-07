const express = require('express');
const userRouter = require('./router/users');
const todoRouter = require('./router/todos');
require('./db');
const port = 3000;
const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
 res.send('hello allawy');
});

app.use(['/users','/user'],userRouter);
app.use('/todos',todoRouter);
app.use((err,req,res,next)=>{
  res.status(500).json({ error: 'internal server error' });
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