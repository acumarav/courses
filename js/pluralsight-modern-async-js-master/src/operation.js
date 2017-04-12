const delayms = 1;
const expectedCity = "New York, NY";
const expectedForecast = {
  fiveDay: [60, 70, 80, 45, 50]
};

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

    const fiveDay = expectedForecast;
    /*const fiveDay = {
     fiveDay: [60, 70, 80, 45, 50]
     };*/

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

  const ops = new Operation(function executor(resolve, reject) {
    getCurrentCity(function nodeCallback(error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
  });


  return ops;
}

function fetchWeather(city) {

  const operation = new Operation();

  getWeather(city, operation.nodeCallback);

  return operation;
}

function Operation(executor) {
  const operation = {
    successReactions: [],
    errorReactions: [],
    defaultValue: null,
  };


  operation.resolve = function resolve(value) {
    if (operation.resolved) {
      return;
    }
    operation.resolved = true;
    internalResolve(value);
  }

  operation.onCompletion = function setCallbacks(onSuccess, onError) {
    const noop = function () {
    };

    const proxyOp = new Operation();


    function successHanlder() {
      doLater(function asyncsuccessHanlder() {
          if (onSuccess) {
            let callbackResult;
            try {
              callbackResult = onSuccess(operation.result);
            } catch (e) {
              proxyOp.fail(e);
              return;
            }
            proxyOp.resolve(callbackResult);
          }
          else {
            proxyOp.resolve(operation.result);
          }
        }
      )
    }

    function errorHandler() {
      doLater(function asyncErrorHandler() {
          if (onError) {
            let callbackResult
            try {
              callbackResult = onError(operation.error);
            } catch (e) {
              proxyOp.fail(e);
              return;
            }
            proxyOp.resolve(callbackResult);
          }
          else {
            proxyOp.fail(operation.error);
          }
        }
      );
    }

    if (operation.state === "succeeded") {
      successHanlder();
    }
    else if (operation.state === "failed") {
      errorHandler();
    }
    else {
      operation.successReactions.push(successHanlder);
      operation.errorReactions.push(errorHandler);
    }

    return proxyOp;
  }

  operation.then = operation.onCompletion;

  operation.onFailure = function onFailure(onError) {
    return operation.then(null, onError);
  }

  operation.catch = operation.onFailure;

  operation.reject = function reject(error) {
    if (operation.resolved) {
      return;
    }
    operation.resolved = true;
    internalReject(error);
  }
  operation.fail = operation.reject;

  function internalReject(error) {
    operation.state = "failed";
    operation.error = error;
    if (operation.defaultValue) {
      operation.result = operation.defaultValue;
    }
    else {
      operation.errorReactions.forEach(r => r(error));
    }
  }


  function internalResolve(result) {
    if (result && result.then) {
      result.then(internalResolve, internalReject);
      return;
    }
    operation.state = "succeeded";
    operation.result = result;
    operation.successReactions.forEach(r => r(result));
  };

  operation.nodeCallback = function nodeCallback(error, result) {
    if (error) {
      operation.reject(error);
      return;
    }
    operation.resolve(result);
  }

  if (executor) {
    executor(operation.resolve, operation.reject);
  }

  return operation;
}

Operation.reject = function (reason) {
  return new Operation(function (resolve, reject) {
    reject(reason);
  });
}

Operation.resolve = function (result) {
  return new Operation(function (resolve, reject) {
    resolve("result");
  });
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
    .then(fetchWeather)
    .then(printTheWeather);

  function printTheWeather(weather) {
    console.log(weather);
    done();
  }
});

function fetchCurrentCityThanFails() {
  var op = new Operation();
  doLater(() => op.fail("GPS broken"));
  return op;
}

test("sync error recovery", function (done) {
  fetchCurrentCityThanFails()
    .catch(() => "default city")
    .then(function (city) {
      expect(city).toBe("default city");
      done();
    })
});

test("async error recovery", function (done) {
  fetchCurrentCityThanFails()
    .catch(fetchCurrentCity)
    .then(function (city) {
      expect(city).toBe(expectedCity);
      done();
    })
});

test("error recovery bypassed if not needed", function (done) {
  fetchCurrentCity()
    .catch(error => "default city")
    .then(function (city) {
      expect(city).toBe(expectedCity);
      done();
    });
});


test("error fallthrough", function (done) {
  fetchCurrentCity()
    .then(function (city) {
      console.log(city);
      return fetchForecast(city);
    })
    .then(function (forecast) {
      expect(forecast).toBe(expectedForecast);
      done();
    }).catch(function (error) {
    done();
  })
});

test("sync success call", function (done) {
  fetchCurrentCity().then(function (city) {
    return expectedForecast;
  }).then(function (forcast) {
    console.log(forcast);
    done();
  })
});

test("throw error recovery", function (done) {
  fetchCurrentCity().then(function (city) {
    throw new Error("Oh noes");
    return fetchWeather(city);
  }).catch(e => done());
});


test("error, error recovery", function (done) {
  fetchCurrentCity().then(function (city) {
    throw new Error("Oh noes");
    return fetchWeather(city);
  })
    .catch(function (error) {
      expect(error.message).toBe("Oh noes");
      throw new Error("Error from an error handler, ohhh my!");
    })
    .catch(function (error) {
      expect(error.message).toBe("Error from an error handler, ohhh my!");
      done();
    });
});

function fetchCurrentCityIndecisive() {
  const operation = new Operation();
  doLater(function () {
    operation.resolve("NYC");
    operation.resolve("Philly");
  });
  return operation;
}


test("protect from doubling up on success", function () {
  return fetchCurrentCityIndecisive();
})

function fetchCurrentCityRepeatedFails() {
  const operation = new Operation();
  doLater(function () {
    operation.fail(new Error("I failed"));
    operation.fail(new Error("I failed again!"));
  });
  return operation;
}


test("protect from doubling up on failures", function (done) {
  fetchCurrentCityRepeatedFails().catch(e => done());
})

test("ensure success handlers are async", function (done) {
  /*var op = new Operation(function executor(resolve, reject) {
    resolve("New York, NY");
  });
  //op.resolve("New York, NY");
  op.then(function (city) {
    doneAlias();
  });*/
  Operation.resolve("New York, NY").then(function (city) {
    doneAlias();
  });
  const doneAlias = done;
});


test("ensure error hanlders are async", function (done) {
  Operation.reject(new Error("oh noes")).catch(err => doneAlias());

  const doneAlias = done;
});

test("what is resolve?", function (done) {
  const fetchCurrentCity = new Operation();
  fetchCurrentCity.resolve("NYC");

  const fetchClone = new Operation();
  fetchClone.resolve(fetchCurrentCity);

  fetchClone.then(function (city) {
    expect(city).toBe("NYC");
    done();
  })
});