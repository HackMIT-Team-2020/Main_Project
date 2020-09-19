$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 400,
        height: 518,
    });
    var id = ''

    $("#ctinput").hide();
    $("#ctsubmit").hide();
    $("#ctcancel").hide();

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
        $("#ctcancel").show();
        $("#changetitle").hide();
        $("#title").hide();
    });

    //change title
    $("#ctsubmit").click(function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#ctcancel").hide();
        if ($('#ctinput').val().length != 0) {
            $("#title").text($('#ctinput').val());
        }
        $("#title").show();
        $("#changetitle").show();
    });

    $("#ctcancel").click(function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#ctcancel").hide();
        $("#title").show();
        $("#changetitle").show();
    });

    $("#saveimg").click(function () {
        axios.post('/addnote', {
                data: {
                    title: $("#title").text(),
                    stroke_data: sketchpad.toJSON(),
                    image: $("#sketchpad")[0].toDataURL(),
                    id: id
                }
            })
            .then(function (response) {
                if(id.length == 0){
                  id = response.data
                }
                console.log(response)
                console.log(id)
            })
            .catch(function (response) {
                console.log('error');
            });

    })

});
