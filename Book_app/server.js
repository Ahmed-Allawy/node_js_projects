const express = require('express');
const {port} = require('./config');
const storeRouter = require('./route/store.route');
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

// app.use(['/users','/user'],userRouter);
app.use('/store',storeRouter);
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
