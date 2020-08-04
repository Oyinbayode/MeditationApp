const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    // Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    // Time Display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //Duration of MEdia
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Play Sounds
    play.addEventListener("click", () => {
        checkPlayorPause(song);
    });

    // Select Sound
    timeSelect.forEach(sound => {
        sound.addEventListener("click", () => {
            fakeDuration = sound.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    // Create a function specifi to stop and play the sounds
    const checkPlayorPause = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg"
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }

    // Animate the Circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let timeLeft = fakeDuration - currentTime;
        let seconds = Math.floor(timeLeft % 60);
        let minutes = Math.floor(timeLeft / 60);
        let hours = 00;

        //Animate the Cirle really
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style["strokeDashoffset"] = progress;

        // Update the text
        timeDisplay.textContent = `${minutes}:${seconds}`

        if(currentTime >= fakeDuration) {
            song.pause();
            video.pause()
            play.src = "./svg/play.svg"
            timeDisplay.textContent = `00:00`;
            song.currentTime = 0;
        }
    }

    // Change the Video when I chick different Icons
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlayorPause(song);
        })
    })
}

app();