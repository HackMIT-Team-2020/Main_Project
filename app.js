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

app.get('/getnote_text/:id', function (req, res) {
  res.send(db.get('notes').find({id:req.params.id}).value().text);
})

const gcp = require('./send_gcp_request.js')


app.get('/parseNote/:id', function (req, res) {
  if(db.get('notes').find({id:req.params.id}).value()){
    imgPath = path.join('public', 'images', req.params.id+'.png')
    gcp.send(imgPath, function(parsedText){
      if(parsedText){
        db.get('notes').find({id:req.params.id}).assign({
          text: parsedText,
          time_saved: Date.now(),
          review_times:[],
          review_scores:[]
        }).write()
        res.send(parsedText)
      }
      else{
        res.send("NO TEXT DETECTED")
      }
    })
  }
  else{
    console.log(req.params.id)
    res.sendStatus(404)
  }
})

app.get('/review_schedule', function (req, res) {
  output = []
  for(note of db.get('notes')){
    if(!(note.text && note.time_saved && note.review_times && note.review_scores)){
      console.log(note.title+" Doesn't have required quiz params")
    }
    else{
      const review_time = getNextReview(note)
      console.log(note.title + '\t' + review_time)
      output.push({
        title:note.title,
        id: note.id,
        review_time: review_time
        })
    }
  }
  output.sort((itemA, itemB)=>{
    return itemB.review_time - itemA.review_time
  })
  res.send(output);
})

function getNextReview(note){
  const len = note.review_times.length
  let days_reviewed = 0
  let time_diff = 0
  if(len!=0){
    days_reviewed = (note.review_times[len-1]-note.review_times[0])/(86400 * 1000)
    time_diff = (note.review_times[len-1]-note.review_times[0])
  }
  console.log(days_reviewed)
  if(days_reviewed <= 1){
    return note.time_saved + 86400 * 1000
  }
  else if(days_reviewed <= 3){
    return note.time_saved + 86400 * 2 * 1000
  }
  else if(days_reviewed > 3){
    return note.time_saved + time_diff * note.review_scores(len-1)
  }

}

app.post('/correctParse/:id', function (req, res) {
  const corrected_text =  req.body.text
  if(db.get('notes').find({id:req.params.id}).value()){
      db.get('notes').find({id:req.params.id}).assign({text: corrected_text}).write()
      res.send("Sucess!")
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
      saveImage(data.id, data.image)
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
    saveImage(data.id, data.image)
    data.external_id = crypto.randomBytes(6).toString('hex');
    db.get('notes').push(data).write()
    res.send(data.id);
  }

})

function saveImage(id, imageData){
  const base64Image = imageData.split(';base64,').pop();
  fs.writeFileSync(path.join('public','images',id+'.png'), base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created for '+id);
  });
}

app.post('/quiz', function (req, res) {
  required = [req.body.id, req.body.score]
  console.(req.body)
  data = db.get('notes').find({id:req.body.id}).value()
  if(data){
    data.review_times.push(Date.now())
    data.review_scores.push(req.body.score)
    db.get('notes').find({id:req.body.id}).assign(data).write()
    res.send(getNextReview(data))
  }
  else
    res.sendStatus(404);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
