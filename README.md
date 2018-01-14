# Countdown clock
Animated time countdown clock

Usage: 

1. Download files<br>
2. Add script to your file<br>
3. Add init to your .js file:<br>
<code>let finishDate = new Date(Date.parse(new Date()) + 24.001 * 60 * 60 * 1000);</code><br>
<code>initializeClock(finishDate, 1000);</code><br>
4. Copy HTML from demo.html<br>
5. You can remove any div with time range without risk of getting error<br>
6. Options:<br>
<code>stopCountdown = () => {
    clearInterval(clockIntervala);
};</code><br>
<code>startCountdown = (finishDate) => {
    initializeClock(finishDate);
};</code><br>
<code>onTimeChange = (t) => {};</code><br>
<code>coundtdownFinished = () => {};</code>

### TODO: 

1. Animations
2. Multiple clocks on one page
3. Custom time
