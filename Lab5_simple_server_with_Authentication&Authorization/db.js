const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/day4_task"
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('connected !');
}).catch(err=>{
  console.log(err);
  process.exit(1);
});