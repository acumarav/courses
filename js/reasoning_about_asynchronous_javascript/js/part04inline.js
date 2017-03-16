//inline
const progress = document.getElementById("workerProgress");

crunchNumbers(function showProgress(percent) {
  progress.value = percent;
});

function crunchNumbers(progressCallback) {
  for (let step = 0; step <= 10; step++) {
    progressCallback(step * 10);

    console.log('step: '+step);
    const start = Date.now();
    const seconds = 1;
    const waitUntil = start + seconds * 1000;
    while (Date.now() < waitUntil) {}
  }
}

