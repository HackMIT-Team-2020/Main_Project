$(window).on('pageshow',function () {
    // inline styling:
    // text-decoration:none; color: black;
    ///
    const Note_Card = ({id, title}) => `
        <a href="/edit.html?id=${id}" style="text-decoration:none; color: black;">
          <div class="card">
            <img class="card-img-top" src="/images/${id}.png" alt="notes preview" style="width: 200px;" "="">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
            </div>
          </div>
        </a>
    `;
    //Stop caching me chrome :(
    axios.get('/getnotes?time='+Date.now()).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            console.log(data);
            $('#cardstack').prepend(
              Note_Card({id:data.id, title:data.title})
            );
        }

    });


    const Schedule_Row = ({ url, title, time }) => `
      <a href="${url}" class="list-group-item">
        <h2 class="list-group-item-text">${title}</h2>
        <p>${time}</p>
      </a>
    `;
    axios.get('/review_schedule?time='+Date.now()).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            console.log(data);
            const date = new Date(data.review_time)
            const options = { weekday: 'long', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' }
            const date_string = date.toLocaleDateString(undefined, options)
            console.log(date_string)
            $('#schedule').prepend(Schedule_Row({url:'/quiz.html?id='+data.id, title:data.title, time:date_string}));
        }

    });

    $("#newnote").click(function () {
        localStorage.setItem('openid', '');
        window.location.href = "/edit.html";
    });
});
