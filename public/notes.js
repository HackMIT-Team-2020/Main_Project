$(document).ready(function () {
    axios.get('/getnotes').then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            console.log(data);
            $('#cardstack').prepend('<div class="card" id="' + data.id + '" onclick="clickNote(`' + data.id + '`)"><img class="card-img-top" src="/images/' + data.id + '.png" alt="notes preview" style="width: 200px;" "><div class="card-body"><h5 class="card-title">' + data.title + '</h5></div></div>');
        }

    });

    $("#newnote").click(function () {
        localStorage.setItem('openid', '');
        window.location.href = "/edit.html";
    });
});

function clickNote(id) {
    localStorage.setItem('openid', id);
    window.location.href = "/edit.html?id=" + id;
}