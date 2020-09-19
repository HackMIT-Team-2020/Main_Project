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

    //change title
    $("#ctsubmit").click(function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#title").text($('#ctinput').val());
        $("#changetitle").show();
    });

    $("#saveimg").click(function () {
        axios.post('/addnote', {
                data: {
                    title: $("#title").text(),
                    stroke_data: sketchpad.toJSON(),
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