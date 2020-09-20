$(window).on('pageshow', function () {

  const Schedule_Row = ({
    review_url,
    stats_url,
    title,
    time
  }) => `
    <div class="list-group-item">
      <a href="${review_url}"  >
        <h2 class="list-group-item-text">${title}</h2>
        <p>${time}</p>
      </a>
      <a href="${stats_url}" class="btn btn-navy" role="button">View Stats</a>

    </div>
    `;
  axios.get('/review_schedule?time=' + Date.now()).then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
      var data = response.data[i];
      console.log(data);
      const date = new Date(data.review_time)
      const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
      const date_string = date.toLocaleDateString(undefined, options)
      console.log(date_string)
      $('#schedule').prepend(Schedule_Row({
        review_url: '/quiz.html?id=' + data.id,
        stats_url: '/stats.html?id=' + data.id,
        title: data.title,
        time: date_string
      }));
    }

  });

});
