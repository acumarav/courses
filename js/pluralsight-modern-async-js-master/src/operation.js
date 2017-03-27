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
function fetchForecast(city) {
  const ops = new Operation();
  getForecast(city, ops.nodeCallback);

  return ops;
}

function fetchCurrentCity() {

  const ops = new Operation();
  getCurrentCity(ops.nodeCallback);

  return ops;
}

function fetchWeather(city) {

  const operation = new Operation();

  getWeather(city, operation.nodeCallback);

  return operation;
}

function Operation() {
  const operation = {
    successReactions: [],
    errorReactions: []
  };

  operation.onCompletion = function setCallbacks(onSuccess, onError) {
    const noop = function () {
    };

    const completionOp = new Operation();

    function successHanlder() {
      if (onSuccess) {
        const callbackResult = onSuccess(operation.result);
        if (callbackResult && callbackResult.onCompletion) {
          callbackResult.forwardCompletion(completionOp);
        }
      }

    }

    if (operation.state === "succeeded") {
      successHanlder();
    }
    else if (operation.state === "failed") {
      onError(operation.error)
    }
    else {
      operation.successReactions.push(successHanlder);
      operation.errorReactions.push(onError || noop);
    }

    return completionOp;
  }

  operation.onFailure = function onFailure(onError) {
    return operation.onCompletion(null, onError);
  }

  operation.fail = function fail(error) {
    operation.state = "failed";
    operation.error = error;
    operation.errorReactions.forEach(r => r(error));
  }

  operation.succeed = function succeed(result) {
    operation.state = "succeeded";
    operation.result = result;
    operation.successReactions.forEach(r => r(result));
  }

  operation.nodeCallback = function nodeCallback(error, result) {
    if (error) {
      operation.fail(error);
      return;
    }
    operation.succeed(result);
  }

  operation.forwardCompletion = function (op) {
    operation.onCompletion(op.succeed, op.fail);
  }

  return operation;
}

test('register success callback async', function (done) {
  var succededOperation = fetchCurrentCity();

  doLater(function () {
    succededOperation.onCompletion(() => done())
  })
});

test('register error callback async', function (done) {

  let errWeatherOperation = fetchWeather(null);

  doLater(function () {
    errWeatherOperation.onFailure(() => done())
  })
});

function doLater(fun) {
  setTimeout(fun, 10);
}

test('fetch Forecast fails if no city', function (done) {
  const ops = fetchForecast();
  ops.onCompletion(result => done(new Error('Should not be called')))
  ops.onFailure(error => done());
});

test("fetchCurrentCity with separate success and error callbacks", function (done) {
  function onSuccess(result) {
    //console.log('onSuccess: ' + result);
    done();
  }

  function onError(err) {
    //console.log('onError: ' + err);
  }

  const ops = fetchCurrentCity();
  ops.onCompletion(onSuccess, onError);
});

test("fetchCurrentCity pass the callbacks later on", function (done) {
  var conf = fetchCurrentCity();
  const multiDone = callDone(done).afterTwoCalls();

  conf.onCompletion(
    (res) => multiDone(),
    (err) => console.error('On error later one: ' + err)
  );
  conf.onCompletion((res) => multiDone());
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

  const operation = fetchCurrentCity();
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


test("life is full of async, nesting in inevitable", function (done) {

  fetchCurrentCity()
    .onCompletion(city => fetchWeather(city))
    .onCompletion(weather => done());

});
