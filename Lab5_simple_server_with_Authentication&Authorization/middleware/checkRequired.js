module.exports = checkRequiredParams = (params) => (req, res, next) => {
  const reseivedParams = Object.keys(req.body);
  const missingparams = params.filter(paramName => !reseivedParams.includes(paramName));
  console.log(missingparams.length);
  if (missingparams.length) {
    const error = new Error('required parameters missing');
    error.statusCode = 422;
    error.errors = missingparams.reduce((agg, param)=>{
      agg[param] = {type:'required'};
      return agg;
    },{});
    return next(error);
  }
  else {
    next()
  }
}