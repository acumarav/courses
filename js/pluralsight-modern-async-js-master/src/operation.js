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

  ops.onCompletion = function setCallbacks(onSuccessCallback, onErrorCallback) {

    const noop = function () {};
    this.onSuccess.push(onSuccessCallback || noop);
    if (onErrorCallback) {
      this.onError.push(onErrorCallback);
    }
  }.bind(ops);

  ops.raiseSuccess = function (result) {
    this.onSuccess.forEach(function (callback) {
      callback(result);
    });
  }.bind(ops);

  ops.onFailure = function onFailure(onError) {
    ops.onCompletion(null, onError);
  };

  ops.onCompletion(onSuccess, onError);

  getCurrentCity(function (error, result) {
    if (error) {
      ops.onError.forEach(errCallBack => errCallBack(error));
      return;
    }
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
    const noop = function () {};
    operation.successReactions.push(onSuccess || noop);
    operation.errorReactions.push(onError || noop);
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
  conf.onCompletion((res) => {
      console.log('On succeess later one: ' + res);
    },
    (err) => console.log('On error later one: ' + err)
  );
  //
  conf.onCompletion((res) => {
    console.log('On succeess later two: ' + res);
  });

  conf.onCompletion((res) => done());
});

test("register only error handler, ignore success handler", function (done) {
  const operation = fetchCurrentCity();
  operation.onFailure(error => done(error));
  operation.onCompletion(result => done());
});


test("register only success handler, ignore error handler", function (done) {
  //todo operation which can fail
  const operation = fetchWeather();
  operation.onCompletion(result => done(new Error('should not succeed')));
  operation.onFailure(error => done());
});

test("noop if no success handler passed", function (done) {
  //todo operation which can fail
  const operation = fetchWeather();
  //noop should register for success handler
  operation.onFailure(error => done(error));
  //trigger success to make sure noop registered
  operation.onCompletion(result => done());
});

test("noop if no error handler passed", function (done) {
  const operation = fetchWeather();

  //noop should register for error handler
  operation.onCompletion(result => done(new Error("shouldn't succeed")));
  //trigger failure to make sure noop registered
  operation.onFailure(error => done());
});
