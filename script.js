document.addEventListener("DOMContentLoaded", () => {
    let countdownItems = document.querySelectorAll(".countdown-item");
    let progressBar = document.getElementById("progress-bar");
    let startButton = document.querySelector("button");

    let countdownInterval;
    let totalTime, timeRemaining;

    startButton.addEventListener("click", () => {
        let minutes = parseInt(countdownItems[2].textContent.trim()) || 0;
        let seconds = parseInt(countdownItems[3].textContent.trim()) || 0;

        // Validate input
        if (minutes < 0 || seconds < 0 || (minutes === 0 && seconds === 0)) {
            alert("Please enter a valid time in the boxes!");
            return;
        }

        // Convert time to seconds
        totalTime = minutes * 60 + seconds;
        timeRemaining = totalTime;

        // Start Countdown
        startCountdown();
    });

    function startCountdown() {
        clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                alert("Time's Up!");
                return;
            }

            updateUI();
            timeRemaining--;
        }, 1000);
    }

    function updateUI() {
        let days = Math.floor(timeRemaining / (24 * 3600));
        let hours = Math.floor((timeRemaining % (24 * 3600)) / 3600);
        let minutes = Math.floor((timeRemaining % 3600) / 60);
        let seconds = timeRemaining % 60;

        // Update countdown boxes
        countdownItems[0].textContent = String(days).padStart(2, "0");
        countdownItems[1].textContent = String(hours).padStart(2, "0");
        countdownItems[2].textContent = String(minutes).padStart(2, "0");
        countdownItems[3].textContent = String(seconds).padStart(2, "0");

        // Update progress bar
        let progressPercent = ((totalTime - timeRemaining) / totalTime) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});
