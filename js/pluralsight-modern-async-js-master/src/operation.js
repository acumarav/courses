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
  var ops = {onSuccess: [], onError: []};

  ops.setCallbacks = function (onSuccessCallback, onErrorCallback) {
    if (onSuccessCallback) {
      this.onSuccess.push(onSuccessCallback);
    }
    if (onErrorCallback) {
      this.onError.push(onErrorCallback);
    }
  }.bind(ops);

  ops.raiseSuccess = function (result) {
    this.onSuccess.forEach(function (callback) {
      callback(result);
    });
  }.bind(ops);

  ops.setCallbacks(onSuccess, onError);

  getCurrentCity(function (error, result) {
    if (error) {
      ops.onError.forEach(cb => cb(error));
      //ops.onError(error);
      return;
    }
    //ops.onSuccess(result);
    ops.raiseSuccess(result);
  });

  return ops;
}

function fetchWeather(city) {
  const operation = {
    successReactions: [],
    errorReactions: []
  };

  getWeather(city, function (error, result) {
    if (error) {
      operation.errorReactions.forEach(r => r(error));
      return;
    }
    operation.successReactions.forEach(r => r(result));
  });

  operation.onCompletion = function setCallbacks(onSuccess, onError) {
    const noop = function () {
    };
    operation.successReactions.push(onSuccess || noop);
    operation.errorReactions.push(onerror);
  }

  operation.onFailure = function onFailure(onError) {
    operation.onCompletion(null, onError);
  }
  return operation;
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

test("fetchCurrentCity pass the callbacks later on", function (done) {
  var conf = fetchCurrentCity();
  console.log('Initial conf: ' + JSON.stringify(conf));
  conf.setCallbacks((res) => {
      console.log('On succeess later one: ' + res);
    },
    (err) => console.log('On error later one: ' + err)
  );
  //
  conf.setCallbacks((res) => {
    console.log('On succeess later two: ' + res);
  });

  conf.setCallbacks((res) => done());
});

test("noop if no error handler passed", function (done) {
  //todo operation which can fail
  const operation = fetchCurrentCity();

  operation.onCompletion(result => done(new Error("shouldn't succeed")));
  operation.onFailure(error => done());
});
