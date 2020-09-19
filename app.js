const express = require('express')
let bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json({limit: '500mb', extended: true}));
const favicon = require('serve-favicon');
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(express.static('public'))
// app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})





const crypto = require("crypto");


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ notes: []}).write()



// API Calls
app.get('/getnotes', function (req, res) {
  res.send(db.get('notes'));
})

app.get('/getnote/:id', function (req, res) {
  res.send(db.get('notes').find({id:req.params.id}).value());
})

const gcp = require('./send_gcp_request.js')


app.get('/parseNote/:id', function (req, res) {
  if(db.get('notes').find({id:req.params.id}).value()){
    imgPath = path.join('public', 'images', req.params.id+'.png')
    gcp.send(imgPath, function(parsedText){
      db.get('notes').find({id:req.params.id}).assign({text: parsedText}).write()
      res.send(parsedText)
    })
  }
  else{
    console.log(req.params.id)
    res.sendStatus(404)
  }
})

app.get('/correctParse/:id', function (req, res) {
  const corrected_text =  req.body.data.text
  if(db.get('notes').find({id:req.params.id}).value()){
      db.get('notes').find({id:req.params.id}).assign({text: corrected_text}).write()
  }
  else{
    console.log(req.params.id)
    res.sendStatus(404)
  }
})

app.post('/addnote', function (req, res) {
  //Checking request to see if its valid
  const data = req.body.data
  required_params = [data.title, data.stroke_data, data.image]
  for(param of required_params){
    if(!param){
      console.log("Missing:"+param)
      res.sendStatus(421)
      return
    }
  }

  data.last_saved = Date.now()
  //Update case
  if(data.id && data.id.length>0){
    if(db.get('notes').find({ id: data.id}).value()){
      db.get('notes').find({ id: data.id}).assign(data).write();
      res.send("Updated Note");
    }
    else{
      res.sendStatus(404)
    }
  }
  //Add new note case
  else{
    data.id = crypto.randomBytes(20).toString('hex');
    data.external_id = crypto.randomBytes(6).toString('hex');
    db.get('notes').push(data).write()
    res.send(data.id);
  }
  const base64Image = data.image.split(';base64,').pop();
  fs.writeFile(path.join('public','images',data.id+'.png'), base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created for '+data.id);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
