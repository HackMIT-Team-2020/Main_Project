function getQueryString(field, url) {
  const href = url ? url : window.location.href;
  const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  const string = reg.exec(href);
  return string ? string[1] : null;
};
$(document).ready(function () {
  $("#score").hide();
  if (getQueryString('id') != null) {
    localStorage.setItem('review_id', getQueryString('id'))
    correct = []
    corid = 0
    axios.get('/getnote_text/' + localStorage.getItem('review_id'))
      .then(function (response) {
        let isblank = response.data.startsWith("[")
        monster_tag = ''
        for (piece of toQuiz(response.data)) {
          console.log(piece)
          if(piece.startsWith("\n")){
            monster_tag += '<br>'
            piece = piece.trim()
          }
          // piece = piece.trim()
          if (isblank) {
            if (piece.length > 0) {
              monster_tag += '<input type="text" id="' + corid + '"></input>'
              corid++
              correct.push(piece);
            }
          } else {
            if (piece.length > 0)
              monster_tag += piece
          }
          isblank = !isblank
        }
        monster_tag = '<h3>' + monster_tag + '</h3>'
        $("#question").append(monster_tag)

        $("#submit").click(function () {
          var totalCor = 0
          for (var i = 0; i < correct.length; i++) {
            console.log($("#" + i).val())
            if (correct[i] == $("#" + i).val()) {
              $('#' + i).attr('style', "background-color: #BCAC9B");
              totalCor++;
            } else {
              $('#' + i).attr('style', "background-color: #C17C74");
            }
          }
          scoree = totalCor / correct.length;
          rounded = Math.round(scoree * 10000) / 100
          $("#score").prepend("Your score is " + rounded + "%");
          $("#score").show();
          $("#ok").click(function () {
            window.location.href = "/notes.html";
          })
          $("#submit").hide();
          data = {
            id: getQueryString('id'),
            score: scoree
          }
          axios.post('/quiz', data).then((req) => {
            console.log(req.data)
          })

        })

      })
  }

  //refer to the value inside a input box by $("#id").val()
});

function toQuiz(input) {
  return input.split(/[\[\]]/)
}
