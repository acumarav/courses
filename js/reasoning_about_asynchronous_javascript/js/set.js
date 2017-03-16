setTimeout(function () {
  console.log('st-1');
}, 1);

setTimeout(function () {
  console.log('st-2');
}, 1);

process.nextTick(function () {
  console.log(new Error().stack);
  console.log('nt-1');
});


setTimeout(function () {
  console.log(new Error().stack);
  console.log('st-3');
}, 1);