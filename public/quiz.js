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
    axios.get('/getnote_text/' + localStorage.getItem('review_id'))
      .then(function (response) {
        let isblank = response.data.startsWith("[")
        correct = []
        corid = 0
        console.log(isblank)
        for (piece of toQuiz(response.data)) {
          if (isblank) {
            if (piece.length > 0) {
              $("#question").append('<input type="text" id="' + 0 + '"></input>')
              correct.push(piece.slice(1, piece.length - 1));
            }
          } else {
            if (piece.length > 0) {
              $("#question").append('<h3>' + piece + '<h3/>')
              console.log("PIECE " + piece)
            }
          }
          isblank = !isblank
        }
        console.log(response)

      })
  }

  //refer to the value inside a input box by $("#id").val()
});

function toQuiz(input) {
  return input.split(/[\[\]]/)
}