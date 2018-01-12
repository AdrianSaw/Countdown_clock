/*****************************  COUNTDOWN TIMER ****************************/


// TODO: custom time not only date

getTimeRemaining = (finishDate) => {
    const t = Date.parse(finishDate) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };

}


//TODO : MULTIPLE CLOCKS, let user pick divs and work on seperate timeIntervals

initializeClock = (finishDate, frequency) => {

    const clock = document.getElementById('countdown-clock');

    if (!clock) return console.log("There is no clock");

    updateClock(clock, finishDate);
    clockInterval = setInterval(updateClock.bind(this, clock, finishDate), frequency);
}


updateClock = (clock, finishDate) => {
    const t = getTimeRemaining(finishDate);
    const daysDiv = clock.querySelector('.days');
    const hoursDiv = clock.querySelector('.hours');
    const minutesDiv = clock.querySelector('.minutes');
    const secondsDiv = clock.querySelector('.seconds');


    // check timerange and set clock values and images

    if (daysDiv) {
        const days = ("0" + t.days).slice(-2).split('');
        updateTimeRows(daysDiv, days, t);
    }

    if (hoursDiv) {
        const hours = ("0" + t.hours).slice(-2).split('');
        updateTimeRows(hoursDiv, hours, t);
    }

    if (minutesDiv) {
        const minutes = ("0" + t.minutes).slice(-2).split('');
        updateTimeRows(minutesDiv, minutes, t);
    }

    if (secondsDiv) {
        const seconds = ("0" + t.seconds).slice(-2).split('');
        updateTimeRows(secondsDiv, seconds, t);
    }


    // if time runs out clear timer

    if (t.total <= 0) {
        clearInterval(clockInterval);
        coundtdownFinished();
    } else {
        onTimeChange(t);
    }
}

updateTimeRows = (div, time, finishDate) => {
    const clockFrontRows = div.querySelector('.front').children;
    const clockBackRows = div.querySelector('.back').children;

    for (let i = 0; i < clockFrontRows.length; i++) {
        if (i < 2) {
            clockFrontRows[i].style.backgroundPositionX = (-98 * time[0]) + "px";
            clockBackRows[i].style.backgroundPositionX = (-98 * time[0]) + "px";
        } else {
            clockFrontRows[i].style.backgroundPositionX = (-98 * time[1]) + "px";
            clockBackRows[i].style.backgroundPositionX = (-98 * time[1]) + "px";
        }
        clockFrontRows[i].classList.remove("animation-top", "animation-bottom");
    }


    // UGLY AS HELL but working

    if (div.classList[0] == 'seconds') {
        clockFrontRows[2].classList += " animation-top";
        clockFrontRows[3].classList += " animation-bottom";

        if (finishDate.seconds % 10 == 9) {
            clockFrontRows[0].classList += " animation-top";
            clockFrontRows[1].classList += " animation-bottom";
        }
    }

    if (div.classList[0] == 'minutes' && finishDate.seconds == 59) {
        clockFrontRows[2].classList += " animation-top";
        clockFrontRows[3].classList += " animation-bottom";

        if (finishDate.minutes.toString().split('')[1] == 9 && finishDate.seconds == 59) {
            clockFrontRows[0].classList += " animation-top";
            clockFrontRows[1].classList += " animation-bottom";
        }
    }

    if (div.classList[0] == 'hours' && finishDate.minutes == 59 && finishDate.seconds == 59) {
        clockFrontRows[2].classList += " animation-top";
        clockFrontRows[3].classList += " animation-bottom";

        if (finishDate.hours.toString().split('')[1] == 3 && finishDate.minutes == 59 && finishDate.seconds == 59) {
            clockFrontRows[0].classList += " animation-top";
            clockFrontRows[1].classList += " animation-bottom";
        }
    }

    if (div.classList[0] == 'days' && finishDate.hours == 23 && finishDate.minutes == 59 && finishDate.seconds == 59) {
        clockFrontRows[2].classList += " animation-top";
        clockFrontRows[3].classList += " animation-bottom";

        if (finishDate.days == 9 && finishDate.hours == 23 && finishDate.minutes == 59 && finishDate.seconds == 59) {
            clockFrontRows[0].classList += " animation-top";
            clockFrontRows[1].classList += " animation-bottom";
        }
    }

}


// Stop visual counting (amount of time left to end is still moving because it's a date).
//This function will be more useful with custom finishing time

stopCountdown = () => {
    clearInterval(clockInterval);
}


// re-init - amount of time left to end is still moving because it's a date. 
//This function will be more useful with custom finishing time

startCountdown = (finishDate) => {
    initializeClock(finishDate);
}


// access to time object

onTimeChange = (t) => {}


// fire event when countdown finished 

coundtdownFinished = () => {}


let finishDate = new Date(Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000);

// Set countodwn finish date, set its interval
initializeClock(finishDate, 1000);