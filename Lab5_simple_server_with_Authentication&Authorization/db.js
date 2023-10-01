const mongoose = require('mongoose');
const {uri} = require('./config');

mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('connected !');
}).catch(err=>{
  console.log(err);
  process.exit(1);
});