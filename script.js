const img = document.querySelector('.result');
const heading = document.querySelector('.header');
const errorMsg = document.querySelector('#spanErrorMsg');
const resetBtn = document.querySelector('#reset-btn');

const constraints = {
    video: {
        width: 1280, height: 720
    }
};


init = async () => {
    img.src="";
    heading.textContent = "";
    question();
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setTimeout(()=>handleSuccess(stream), 6500);
    }
    catch(e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

question = () => {
    new TypeIt(heading, {
        strings: "Mirror Mirror on this site, who's the fairest of them all?",
        speed: 100,
        loop: false
      }).go();
}

handleSuccess = (mediaStream) => {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);

    console.log(imageCapture);
    handleImageCapture(imageCapture);
}

handleImageCapture = (imageCapture) => {
    imageCapture.takePhoto()
        .then(blob => {
            img.src = URL.createObjectURL(blob);
            img.onload = () => { URL.revokeObjectURL(this.src); }
        })
        .catch(error => console.error('takePhoto() error:', error));
}

handleReset = () => {
    init();
}

init(); //begin the process
