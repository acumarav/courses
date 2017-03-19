const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {
        const city = "New York, NY";
        callback(null, city);

    }, delayms)
}

function getWeather(city, callback) {
    setTimeout(function () {
        if (!city) {
            callback(new Error("City required to get weather"));
            return;
        }
        const weather = {
            temp: 50
        };

        callback(null, weather)

    }, delayms)
}

function getForecast(city, callback) {
    setTimeout(function () {

        if (!city) {
            callback(new Error("City required to get forecast"));
            return;
        }

        const fiveDay = {
            fiveDay: [60, 70, 80, 45, 50]
        };

        callback(null, fiveDay)

    }, delayms)
}

suite.only("operations")
function fetchCurrentCity(onSuccess, onError) {
    getCurrentCity(function (error, result) {
        if (error) {
            onError(error);
            return;
        }
        onSuccess(result);
    })
}

test("fetchCurrentCity with separate success and error callbacks", function (done) {
    function onSuccess(result) {
        console.log('onSuccess: ' + result);
        done();
    }
    function onError(err) {
        console.log('onError: ' + err);
    }

    fetchCurrentCity(onSuccess, onError);
});

test("fetchCurrentCity pass the callbacks later on", function () {

});
