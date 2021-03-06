function getQueryString(field, url) {
    const href = url ? url : window.location.href;
    const reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    const string = reg.exec(href);
    return string ? string[1] : null;
};

$(document).ready(function () {
    var sketchpad = new Sketchpad({
        element: '#sketchpad',
        width: $(document).width() * 0.8,
        height: $(document).height() * 0.8,
    });
    $("#color_picker").change(function (event) {
        console.log($(this).val());
        $("#color_front").css('background-color', $(this).val());
    });

    $("#color_front").click(function (event) {
        $("#color_picker").click();
    });
    if (getQueryString('id') != null) {
        localStorage.setItem('id', getQueryString('id'))
        axios.get('/getnote/' + localStorage.getItem('id'))
            .then(function (response) {
                console.log(response.data.stroke_data)
                $("#title").text(response.data.title);
                output = response.data.stroke_data;
                output.width = $(document).width() * 0.8
                output.height = $(document).height() * 0.8
                output['element'] = '#sketchpad';
                sketchpad = new Sketchpad(output);


            })
    }
    else{
      localStorage.setItem('id', '')
    }

    // $('#sketchpad').addEventListener('touchmove', function(event){
    //     for(var i = 0; i < event.touches.length; i++){
    //          if(event.touches[i].touchType === "stylus"){
    //            continue;
    //          }
    //          else{
    //            event.preventDefault()
    //          }
    //     }
    // });


    $("#ctinput").hide();
    $("#ctsubmit").hide();
    $("#ctcancel").hide();
    $("#verify").hide();

    $("#undo").on('click tap',function () {
        sketchpad.undo();
    });

    $("#redo").on('click tap',function () {
        sketchpad.redo();
    });

    $("#color_picker").change(function () {
        sketchpad.color = $(this).val();
    });

    $("#changetitle").on('click tap',function () {
        $("#ctinput").show();
        $("#ctsubmit").show();
        $("#ctcancel").show();
        $("#changetitle").hide();
        $("#title").hide();
    });

    //change title
    $("#ctsubmit").on('click tap',function () {
        $("#ctinput").hide();
        $("#ctsubmit").hide();
        $("#ctcancel").hide();
        if ($('#ctinput').val().length != 0) {
            $("#title").text($('#ctinput').val());
            saveNotes()
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
        saveNotes()
    })

    $("#parseText").click(function () {
        console.log("Pressed Brown Save")
        $("#verify").show();
        $("#vinput").hide();
        $("#vsave").hide();
        $("#vclose").hide();


        saveNotes(function (response) {
            console.log(response)
            axios.get('/parseNote/' + localStorage.getItem('id')).then(function (response) {
                console.log("Parsed Text\n" + response.data)
                $("#loader").hide();
                $("#vinput").show();
                $("#vinput").val(response.data);
                $("#vsave").show();
                $("#vclose").show();

                $("#vsave").click(function () {
                    $("#verify").hide();
                    axios.post('/correctParse/' + localStorage.getItem('id'), {
                            text: $("#vinput").val()
                        })
                        .then(function (response) {
                            console.log(response.data)
                        })
                })
                $("#vclose").click(function () {
                    $("#verify").hide();
                })
            })
        })

    })

    function saveNotes(callback) {
        console.log(localStorage.getItem('id'))
        axios.post('/addnote', {
                data: {
                    title: $("#title").text(),
                    stroke_data: sketchpad.toObject(),
                    image: $("#sketchpad")[0].toDataURL(),
                    id: localStorage.getItem('id') != null ? localStorage.getItem('id') : ''
                }
            })
            .then(function (response) {
                if (!localStorage.getItem('id')) {
                    localStorage.setItem('id', response.data)
                    console.log(localStorage.getItem('id'))
                }
                new Noty({
                    text: 'Saved Successfuly!',
                    type: 'success',
                    theme: 'relax'
                }).show();
                if (callback)
                    callback(response)

            })
            .catch(function (response) {
                console.log(response)
                console.log('Error Saving Notes');
            });
    }

});
