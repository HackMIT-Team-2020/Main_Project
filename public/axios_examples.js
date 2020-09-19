axios.get('/parseNote/'+id)
.then(function (response) {
  console.log("The parsed text is: " + response.data)
})

axios.post('/correctParse/'+id, {text:'The Corrected text goes here'})
.then(function (response) {
  console.log(response.data)
})
