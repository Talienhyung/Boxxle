let Music = new Audio("Background.mp3"); 

        const backgroundaudio = () => {
 Music.play();
}
let userName = document.querySelector("#userInput"); // For fetching username

const onload = () => {
        userName.value = "";
}