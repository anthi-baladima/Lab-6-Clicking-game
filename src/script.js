//ο χρόνος τώρα σε ms
//current time in ms
let start = new Date().getTime();

//ο συνολικός χρόνος του παίχτη
//the player's total time
let totalTime = 0;

//ο αριθμός των προπαθειών
//number of attempts
let attempts = 0;

//το παιχνίδι τελειώνει μετά από τόσες προσπάθειες 
//max attempts
const maxAttempts = 10;
document.querySelector("#attempts").innerHTML = maxAttempts - attempts;

var newGame = document.querySelector("#new-game");
newGame.onclick = function(){
    //εμφάνισε τον πρώτο κύκλο
    //show the first circle
    document.querySelector("#gameOver").style.display = "none";
    this.style.display = "none";
    appearAfterDelay();
    totalTime = 0;
    attempts = 0;
    document.querySelector("#attempts").innerHTML = maxAttempts - attempts;
    document.querySelector("#timeTaken").innerHTML = "";
    document.querySelector("#totalTime").innerHTML = "";
}

//επιστρέφει ένα τυχαίο χρώμα
//return a random color
function getRandomColor() {
    let color = '#';
    var letters = '0123456789ABCDEF'
    //κάντε τις απαραίτητες αλλαγές ώστε η getRandomColor() να επιστρέφει ένα τυχαίο χρώμα, αντί για το κόκκινο που επιστρέφει τώρα
    //make the appropriate changes such so that it returns a random color
    for (var i=0; i<6; i++) {    
        color = color + letters[Math.floor(Math.random() * 16)];
    }

    //the World Wide Web Consortium (W3C) offers a standard formula for calculating the perceived brightness of a color
    R=parseInt(color.slice(1,3), 16);
    G=parseInt(color.slice(3,5), 16);
    B=parseInt(color.slice(5,7), 16);
    brightness1 = (299*R + 587*G + 114*B) / 1000;

    R=240;
    G=248;
    B=255;
    brightness2 = (299*R + 587*G + 114*B) / 1000;
    if (brightness2 - brightness1 < 50) {
        color = getRandomColor();
    }
    return color;
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//Εμφανίζει σε τυχαία θέση έναν κύκλο με τυχαία διάμετρο και χρώμα
//shows a circle in a random position with a random color
function makeShapeAppear() {
    //Αντί για σταθερές τιμές, δώστε στις μεταβλητές top, left, width τυχαίες τιμές (που να έχουν νόημα),
    //ώστε οι κύκλοι να εμφανίζονται σε τυχαία θέση και με τυχαία διάμετρο (ούτε τεράστια, ούτε πάρα πολύ μικρή)
    //και να είναι πάντα μέσα στο πλαίσιο
    //Instead of fixed values, for top, left and width use random values (that are sensible), so that the circles
    //always appear in a random position and with a random size (not huge, not tiny) and always in the frame
    let width = getRandomIntInclusive(20, 300);
    let top = getRandomIntInclusive(0, 500 - width);
    let left = getRandomIntInclusive(0, 800 - width);

    circle = document.querySelector("#shape");
    circle.style.background = getRandomColor();
    circle.style.display = "block";
    circle.style.width = width + "px";
    circle.style.height = width + "px";
    circle.style.top = top + "px";
    circle.style.left = left + "px";

    //ο χρόνος τώρα σε ms
    //current time in ms
    start = new Date().getTime();
}

//περιμένει από 0 ως 2 δευτερόλεπτα και εμφανίζει έναν κύκλο
//waits 0 to 2 sec before showing the circle
function appearAfterDelay() {
    //προσθέστε κώδικα ώστε το σχήμα να εμφανίζεται μετά από τυχαίο διάστημα 0-2 δευτερολέπτων
    setTimeout(makeShapeAppear, getRandomIntInclusive(0, 2000));
}

//όταν ο παίχτης κάνει κλικ σε ένα σχήμα πρέπει να γίνουν μια σειρά από πράγματα...
//when the player clicks the shape ...
document.querySelector("#shape").onclick = function () {
    var roundTime = new Date().getTime() - start;
    document.querySelector("#timeTaken").innerHTML = roundTime / 1000 + " s";
    totalTime += roundTime;
    document.querySelector("#totalTime").innerHTML = totalTime / 1000 + " s";

    this.style.display = "none";
    attempts += 1;
    document.querySelector("#attempts").innerHTML = maxAttempts - attempts;
    if (attempts == maxAttempts){
        document.querySelector("#gameOver").style.display = "block";
        newGame.style.display = "block";
    }
    else {
        appearAfterDelay();
    }
}