$(document).ready(function () {
    id = "b445a492b669686ddaf5a1e7eba70017f6d682cf";
    axios.get('/getnote/review_data/' + id).then(function (response) {
        console.log(response.data);
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: response.data.times,
                datasets: [{
                    label: 'score percentage',
                    data: response.data.scores,
                    backgroundColor: [
                        'rgba(193, 124, 116, 0.2)'
                    ],
                    borderColor: [
                        'rgba(193, 124, 116, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });

})