const writeFile = (path,data,message,fs,res)=>{

  fs.writeFile(path, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    // done!
    res.end(message);
  });
}

module.exports = writeFile;