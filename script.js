const img = document.querySelector('.result');
const heading = document.querySelector('.header');
const errorMsg = document.querySelector('#spanErrorMsg');
const resetBtn = document.querySelector('#reset-btn');
const resultPicture = document.querySelector('.result-picture');

const firstVideo = document.querySelector('#first-video');
const videoContainer = document.querySelector(".video-container");
const videoBtn = document.querySelector('#video');


const mediaRecorder = "";
const constraints = {
    video: {
        width: 1280, height: 720
    }
};

const secondContraints = {
    audio: false,
    video: {
        facingMode: "user",
        width: 640,
        height: 480
    }
};

// Initialization process for Image(setting up mediaDevice API)
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

// Initialization process for video live
initVideo = async() => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(secondContraints)
        handleVideoSuccess(stream);
        
    }
    catch(e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error: ${e.toString()}`;
    }
}

showVideo = () => {
    //change button text
    changeBtnText(videoBtn, "Show Video", "Close Video")

    //remove image and heading if video button is shown
    displayChange(img);
    displayChange(heading);

    //toogle between video display on button clicked
    videoContainer.classList.toggle("video-display")

    //start video
    initVideo();
}


//function to change button text
changeBtnText = (btn, fromText, toText) => {
    if(btn.textContent === fromText)
        btn.textContent = toText
    else
        btn.textContent = fromText
}

displayChange = (element) => {
    if(element.style.display === "block" || element.style.display === "" )
        element.style.display = "none";
    else
        element.style.display = "block";
}

//display welcome message using TypeIt library
question = () => {
    new TypeIt(heading, {
        strings: "Mirror, Mirror on the Screen, Who's the fairest of Them All?",
        speed: 100,
        loop: false
      }).go();
}

//Get image from API
handleSuccess = (mediaStream) => {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(mediaStreamTrack);

    console.log(imageCapture);
    handleImageCapture(imageCapture);
}

//insert image to HTML element
handleImageCapture = (imageCapture) => {
    imageCapture.takePhoto()
        .then(blob => {
            img.src = URL.createObjectURL(blob);
            img.onload = () => { URL.revokeObjectURL(this.src); }
        })
        .catch(error => console.error('takePhoto() error:', error));
}

//Restart process on click
handleReset = () => {
    init();
}

//display video inside Video element
handleVideoSuccess = (mediaStream) => {
    window.stream = mediaStream;
    firstVideo.srcObject = mediaStream;
}
//begin the process
init(); 
