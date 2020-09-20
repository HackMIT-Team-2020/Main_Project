function getQueryString(field, url) {
  const href = url ? url : window.location.href;
  const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  const string = reg.exec(href);
  return string ? string[1] : null;
};
$(document).ready(function () {
  if (getQueryString('id') != null) {
    console.log("CALLED")
    localStorage.setItem('review_id', getQueryString('id'))
    correct = []
    corid = 0
    axios.get('/getnote_text/' + localStorage.getItem('review_id'))
      .then(function (response) {
        let isblank = response.data.startsWith("[")
        monster_tag = ''
        for (piece of toQuiz(response.data)) {
          if (isblank) {
            if (piece.length > 0) {
              monster_tag += '<input type="text" id="' + corid + '"></input>'
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
        console.log(response)

      })
  }

  //refer to the value inside a input box by $("#id").val()
});

function toQuiz(input) {
  return input.split(/[\[\]]/)
}