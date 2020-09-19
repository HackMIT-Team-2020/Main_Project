$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 400,
        height: 400,
    });

    $("#undo").click(function () {
        sketchpad.undo();
    });

    $("#redo").click(function () {
        sketchpad.redo();
    });
});