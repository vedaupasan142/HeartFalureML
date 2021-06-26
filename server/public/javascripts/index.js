(function() {

    $('.answers').hide();
    $('.loading').hide();
    $('#form').submit(onFormSubmit);
    $('#age').val('40');
    $('#sex').val('1');
    $('#cp').val('0');
    $('#trestbps').val('125');
    $('#chol').val('220');
    $('#fbs').val('0');
    $('#restecg').val('1');
    $('#thalach').val('144');
    $('#exang').val('0');
    $('#oldpeak').val('0.4');
    $('#slope').val('1');
    $('#ca').val('4');
    $('#thal').val('3');
    

    function onFormSubmit() {
        var age = $('#age').val();
        var sex = $('#sex').val();
        var cp = $('#cp').val();
        var trestbps = $('#trestbps').val();
        var chol = $('#chol').val();
        var fbs = $('#fbs').val();
        var restecg = $('#restecg').val();
        var thalach = $('#thalach').val();
        var exang = $('#exang').val();
        var oldpeak = $('#oldpeak').val();
        var slope = $('#slope').val();
        var ca = $('#ca').val();
        var thal = $('#thal').val();
        $('.loading').show();
        $('.answers').hide();
        $('.classify-btn').prop('disabled', true);
        $.post("/classify", {age: age,
                             sex: sex,
                             cp: cp,
                             trestbps: trestbps,
                             chol: chol,
                             fbs: fbs,
                             restecg: restecg,
                             thalach: thalach,
                             exang: exang,
                             oldpeak: oldpeak,
                             slope: slope,
                             ca: ca,
                             thal: thal
                            }, function(data) {
            renderAnswer(data)
        }).fail(function(err) {
            renderAnswer(err);
        });
        return false;
    }

    function renderAnswer(parsedResponse) {
        console.log(parsedResponse);

        if (parsedResponse.errors) {
            $('.answer').html('Something went wrong :-( ' + parsedResponse.errors[0].message);
        } else {
             data = parsedResponse.predictions[0].values[0]
            //var risk = data[0]
           // var prediction = data[1][0]
            //var probability = data[1][1]
            $('.risk').html('Data: '+data);
            $('.prediction').html('Prediction: '+data);
            $('.probability').html('Probability: '+data);
        }

        $('.classify-btn').prop('disabled', false);
        $('.answers').show();
        $('.loading').hide();
    }
}());
