$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 400,
        height: 518,
    });

    $("#ctinput").hide();
    $("#ctsubmit").hide();

    $("#undo").click(function () {
        sketchpad.undo();
    });

    $("#redo").click(function () {
        sketchpad.redo();
    });

    $("#color_picker").change(function () {
        sketchpad.color = $(this).val();
    });

    $("#changetitle").click(function () {
        $("#ctinput").show();
        $("#ctsubmit").show();
        $("#changetitle").hide();
    });

    $("#ctsubmit").click(function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#title").text($('#ctinput').val());
        axios.post('/addnote', {
                data: {
                    title: $('#ctinput').val()
                }
            })
            .then(function (response) {
                console.log('success');
                console.log(response)
            })
            .catch(function (response) {
                console.log('error');
            });
        $("#changetitle").show();
    });

    $("#saveimg").click(function () {
        axios.post('/addnote', {
                data: {
                    stroke_data: sketchpad.toJSON()
                }
            })
            .then(function (response) {
                console.log('success');
                console.log(response)
            })
            .catch(function (response) {
                console.log('error');
            });

        axios.post('/addnote', {
                data: {
                    image: $("#sketchpad")[0].toDataURL()
                }
            })
            .then(function (response) {
                console.log('success');
                console.log(response)
            })
            .catch(function (response) {
                console.log('error');
            });
    })

});