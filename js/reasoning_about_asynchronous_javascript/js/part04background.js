//background
const progress = document.getElementById("workerProgress");

let worker = new Worker("part04crunch.js");

worker.onmessage = function (message) {
  progress.value = message.data;
};