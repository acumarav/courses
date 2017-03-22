var attempt = 0;
const mastdo_attempts = 3;



function warmUpUrl(url) {

  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 2000;
    xhr.setRequestHeader('Range', 'bytes=100-223');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {

        if (attempt < mastdo_attempts) {
          attempt++;
          var messageFail = 'aborting request due to incorrect request status: ' + xhr.status;
          console.log(messageFail);
          xhr.abort();
          setTimeout(warmUpUrl.bind(this, url), 1500);
        }
        else {
          var messageOk = 'Correct Response status: ' + xhr.status;
          xhr.abort();
          console.log(messageOk);
          resolve(xhr.status);

        }
      }
    }

    xhr.send();
  });
}

var url='https://scontent.cdninstagram.com/t50.2886-16/13404092_839662149467203_833609497_n.mp4';
warmUpUrl(url);