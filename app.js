const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
const favicon = require('serve-favicon');
const port = 3000
const path = require('path')

app.use(express.static('public'))
// app.use(favicon(path.join(__dirname, 'public', 'media', 'favicon.ico')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/newnote', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})



const crypto = require("crypto");


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ notes: []})
  .write()

// API Calls
app.get('/getnotes', function (req, res) {
  res.send(db.get('notes'));
})

// app.get('/note/:noteid', function (req, res) {
//   res.send(db.get('notes'));
// })

app.post('/addnote', function (req, res) {
  if(!req.body.title)
    res.send("Missing Title Parameter")
  else{
    var id = crypto.randomBytes(20).toString('hex');
    db.get('notes').push({
        id: id,
        title:req.body.title,
        // stroke_data: req.body.stroke_data,
        // image: req.body.image,
        time: Date.now(),
      }).write()
    res.send(id);
  }

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
