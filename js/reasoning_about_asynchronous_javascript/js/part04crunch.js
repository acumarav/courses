


//crunch
crunchNumbers(postMessage);

function crunchNumbers(progressCallback) {
  for (let step = 0; step <= 10; step++) {
    progressCallback(step * 10);

    const start = Date.now();
    const seconds = 1;
    const waitUntil = start + seconds * 1000;
    while (Date.now() < waitUntil) {}
  }
}