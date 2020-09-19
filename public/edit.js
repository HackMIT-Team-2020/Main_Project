var id = ''
$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: 800,
        height: 550,
    });

    if (localStorage.getItem('openid') != null) {
        axios.get('/getnote/' + localStorage.getItem('openid'))
            .then(function (response) {
                console.log(response.data.stroke_data)
                $("#title").text(response.data.title);
                output = response.data.stroke_data;
                output['element'] = '#sketchpad';
                sketchpad = new Sketchpad(output);


            })
    }

    $("#ctinput").hide();
    $("#ctsubmit").hide();
    $("#ctcancel").hide();
    $("#verify").hide();

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
                    stroke_data: sketchpad.toObject(),
                    image: $("#sketchpad")[0].toDataURL(),
                    id: id
                }
            })
            .then(function (response) {
                if (id.length == 0) {
                    id = response.data
                }
                console.log(response)
                console.log(id)
            })
            .catch(function (response) {
                console.log('error');
            });
    })

    $("#parseText").click(function () {
        console.log("Pressed Brown Save")
        $("#verify").show();
        $("#vinput").hide();
        $("#vsave").hide();

        axios.post('/addnote', {
                data: {
                    title: $("#title").text(),
                    stroke_data: sketchpad.toJSON(),
                    image: $("#sketchpad")[0].toDataURL(),
                    id: id
                }
            })
            .then(function (response) {
                console.log(response)
                if (id.length == 0)
                    id = response.data
                axios.get('/parseNote/' + id).then(function (response) {
                    console.log("Is this correct")
                    console.log(response.data)
                    $("#loader").hide();
                    $("#vinput").show();
                    $("#vinput").val(response.data);
                    $("#vsave").show();

                    $("#vsave").click(function () {
                        $("#verify").hide();
                        axios.post('/correctParse/' + id, {
                                text: $("#vinput").val()
                            })
                            .then(function (response) {
                                console.log(response.data)
                            })

                    })

                })

            })
    })

});