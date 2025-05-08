function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.opacity = Math.random();
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);

        starsContainer.appendChild(star);
    }
}

class CountdownTimer {
    constructor(displayId, totalSeconds) {
        this.display = document.getElementById(displayId);
        this.totalSeconds = totalSeconds;
        this.timer = null;
        this.start();
    }

    start() {
        this.updateDisplay();

        this.timer = setInterval(() => {
            this.totalSeconds--;
            if (this.totalSeconds <= 0) {
                clearInterval(this.timer);
                this.totalSeconds = 0;
                this.updateDisplay();
                return;
            }
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const days = Math.floor(this.totalSeconds / 86400);
        const remainingSeconds = this.totalSeconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        this.display.textContent = `${days}д ${hh}:${mm}:${ss}`;
    }
}

window.onload = function () {
    createStars();
    const sixtyDaysInSeconds = 60 * 24 * 60 * 60;
    new CountdownTimer('timerCountdown', sixtyDaysInSeconds);
};
