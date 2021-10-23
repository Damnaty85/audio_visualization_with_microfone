let body, num, array, width, context, logo, myElements, analyzer, src, height;

body = document.querySelector('body');
width = 5;
num = window.innerWidth / width;
array = new Uint8Array(num * 2);

window.onclick = function() {
    if (context) return;

    body.querySelector('h1').remove();

    for(let i = 0; i < num; i++) {
        logo = document.createElement('div');
        logo.className = 'logo';
        logo.style.minWidth = width + 'px';
        body.appendChild(logo);
    }

    myElements = document.getElementsByClassName('logo');

    context = new AudioContext();
    analyzer = context.createAnalyser();

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyzer);
        loop()
    }).catch(error => {
        alert(error);
        location.reload();
    })
}

function loop() {
    window.requestAnimationFrame(loop);
    analyzer.getByteFrequencyData(array);
    for (let i = 0; i < num; i++) {
        height = array[i + num];
        myElements[i].style.minHeight = height + 'px';
        myElements[i].style.opacity = 0.08 * height;
        myElements[i].style.background = `rgba(${100 + height}, 0, 0, ${0.008 * height})`;
    }
}