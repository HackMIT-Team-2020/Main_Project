$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 400,
        height: 400,
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
    });

    $("#ctsubmit").click(function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#title").text($('#ctinput').val());
    });

});