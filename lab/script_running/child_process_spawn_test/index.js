const express = require('express')
const {spawn} = require('child_process');
const app = express()
const port = 3000


app.get('/', (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['script1.py']);
 // collect data from script
 python.stdout.on('data', function (data) {
  dataToSend = data.toString();
  console.log('Pipe data from python script ...');
  console.log(dataToSend);
   res.send(dataToSend)
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 });
 
})

var dataToSend2;
app.get('/files/', (req, res) => {
  const child = spawn('find', ['.']);
  child.stdout.on('data', (data) => {
    DatatoSend2 = data.toString();
    console.log(`stdout:\n${data}`);

  });

  child.stderr.on('data', (data) => {
    console.error(`stderr:\n${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code $(code)`);
    res.send(dataToSend2);
    
  });
})





app.listen(port, () => console.log(`example something something on port 3000`))
