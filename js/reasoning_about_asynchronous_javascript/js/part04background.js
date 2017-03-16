//background
const progress = document.getElementById("workerProgress");

let worker = new Worker("js/part04crunch.js");

worker.onmessage = function (message) {
  progress.value = message.data;
};