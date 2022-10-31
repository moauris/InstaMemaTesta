const menuPage : HTMLElement | null 
    = document.getElementById("StartMenuPage");
const countDownPage : HTMLElement | null 
    = document.getElementById("CountDownPage");
const showNumberPage : HTMLElement | null 
    = document.getElementById("ShowNumberPage");
const showScorePage : HTMLElement | null
    = document.getElementById("showScorePage");

let game : Game = new Game(12);
let gameView : GameView = new GameView();

let gamePerformance : Array<Array<number>>;

let currentMaxN : number;
let chosenCorrect : Array<HTMLElement>;
let chosenWrong : Array<HTMLElement>;
let lastChosenDiv : HTMLElement | null;
let difficulty : number;
let didRoundWin : boolean;

let winAtLevel9 : number;

let currentHP : number = 0;

let answers : Array<HTMLElement>;

const startGameSelected : Event = 
    new Event("StartGameSelected");
const startMenuTransitionCompleted : Event = 
    new Event("StartMenuTransitionCompleted");
const countDownCompleted : Event = 
    new Event("CountDownCompleted");
const showNumberCompleted : Event = 
    new Event("ShowNumberCompleted");
const roundEnded : Event = 
    new Event("RoundEnded");
const restartGameSelected : Event =
    new Event("RestartGameSelected")

if (menuPage !== null) {
    document.addEventListener(
        "StartGameSelected", () => transitionOutStartMenu(menuPage));
}
if (showScorePage !== null) {
    document.addEventListener(
        "RestartGameSelected", () => transitionOutStartMenu(showScorePage));
}
document.addEventListener(
    "StartMenuTransitionCompleted", transitionToCountDown);
document.addEventListener(
    "CountDownCompleted", transitionToNumberPage);
document.addEventListener(
    "ShowNumberCompleted", transitionToGuessPage);

document.addEventListener(
    "RoundEnded", transitionToCountDown);

const heartSrc : string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADhUlEQVRoge1Yv2sUQRh9u9FoilgoIoIgFlpY2diEpLOwFWzCFQnXKuIP/CsEkYBaJXBwkMI/wD8gl84uZbp0KUQuEO/23MxnsTt7830zsze7t0eafbC3O7OzM+/N972d2QNatGjR4jIRhTbsdruHANaICEopiPNgf39/o8rAm5ubh3Ecr0VRhDiOYZ6jKBrs7u4G9XcldMAkSXzkQUTrVcgDwHg8dpLPz8H9BQsYj8c+8lBKVeWP0WjkI484joP7CRYwGo3mJm0iTVNWliJC4W25vb19SERF2nwf8gFBxQ8A4PWt6yAifQz6/f5GWX/ffifZ8yS6pazi1e0VU8yg1+s5PeGNgM55fYAMrcQviIDJZFJEx+UJuz8FEuTNislkog1d6okyAeADXhNjEDuZ7V3pJfsjteQlr9sbAnw0/QLEjIKiZdGCh98SPKM/0Irg7hdQZupCWrfbLXIUAHZOzxnR1Z8/2INnz18KPZzAm7urTNDX03MnUeklmZ6663f3b2aE83Vib29vAzAikKZpQT6bIQJAdp66CAfMOCndxk+Wd8NTNE3TIpVMT5gCYAqYiigX4JtVyxMUQc6qi6ivTggo6r0CMOM9nwkUoxikkuQfNy0t+8la82RHvrIA1gEBw2cvvGSzZziB/t9YEFNBRK2KfJKqR4CWnET5GGHhd3vJMfNE4va0XENAbJsqhETQrJIoysja5ZkCLi4uBkS0Pn1rXG2AKCdjGd4sO+6RcU8LyMkf6GbeJW5ra4tME+6c/CkXVBJ+mygvk6PPtw/vsJW41+s5uQavxAXBGuG3iEohjlQNXYmD9kJKqXwhqhd+duEg7opAkiTmF1otAcwTIHKScQ3uK08fLzF1fi12owfwIPjLQXriy/FpKXGaSbT4AQF4//heUM5LBH+RWZ7IV2pnBEqI+95EoTlfW4DlCZepTaLWPTdx3Sw05+cRwD1hRmDm+52TLcrGI6E5LxEuVUB64vPRSRBRXf7w5EGtnJcIjoCEtd8nZfL3EtdVdXNeorYAa79vfrAw7m6D1815iXkE8L2T6wPIYWJdUzfnJepLF5Ce+PTrOLuRE//49FEjOS9ROwIS9jphbD0q7G2qojEB9jqhmKGbynmJJgWIdYKbuqmcl2huKgQ6nQ6ZM95Uzks0FgEJMeOLGmZxAkL/25wXixRwFkXRjVzAcFHjtGjRosXl4j+fDREVsJXPngAAAABJRU5ErkJggg=="

function backToTitle()
{
    menuPage!.style.display = "block";
    countDownPage!.style.display = "none";
    showNumberPage!.style.display = "none";
    showScorePage!.style.display = "none";
}

function transitionOutStartMenu(fromPage : HTMLElement)
{
    fromPage.classList.add("FadeOut");
    gamePerformance = new Array(10);
    for(let i = 0; i < 10; i++)
    {
        gamePerformance[i] = new Array(2);
        gamePerformance[i][0] = 0;
        gamePerformance[i][1] = 0;
    }
    currentHP = 4;
    winAtLevel9 = 0;
    setTimeout(() => {
        fromPage.style.display = "none";
        fromPage.classList.remove("FadeOut");
        document.dispatchEvent(startMenuTransitionCompleted);
    }, 300);
}

function transitionToCountDown()
{
    if(currentHP < 0)
    {
        showScoreCard();
        return;
    }
    if (countDownPage !== void 0) {

        countDownPage!.style.display = 'block';
        setTimeout(() => {
            countDownPage!.style.display = 'none';
            document.dispatchEvent(countDownCompleted);
        }, 3000);
        
    }
    
}

let NumDivs : Array<HTMLElement>;

/* Choose if a level based on a success result
 * returns a number between 4 and 9 inclusive
 */
function chooseLevel(currentLevel : number, isSuccess : boolean) : number
{
    let result : number;
    if (isSuccess) {
        result = Math.min(currentLevel + 1, 9);
    } else {
        result = Math.max(currentLevel - 1, 4);
    }

    return result;
}

function transitionToNumberPage()
{
    if (showNumberPage !== void 0) {
        showNumberPage!.style.display = 'block';
    }
    //judge if last round was an initial, success, or failed round
    // initial = (chosenCorrect === undefined)
    // success = (chosenWrong.len === 0)
    // failed = (chosenWrong.len === 1)
    if(didRoundWin === undefined) 
        difficulty = 4;
    else {
        difficulty = chooseLevel(
            difficulty, 
            didRoundWin);
        console.log("The New Difficulty is: " + difficulty);
    }
       
    NumDivs = [];
    currentMaxN = Number.MIN_VALUE;
    chosenCorrect = [];
    chosenWrong = [];

    game.initRound(difficulty);

    gameView.Circles = game.difficulty;
    let generatedPoints : Array<ScreenPoint> = gameView.GetPoints();
    let nums : Array<number> = game.GuessNumbers;

    for(let n = 0; n < game.difficulty; n++)
    {
        showNumeric(generatedPoints[n], nums[n]);
    }

    NumDivs.sort((a, b) => {
        return a.id < b.id ? 1 : -1
    });

    answers = Array.from(NumDivs);

    showHealth();

    setTimeout(() => {
        document.dispatchEvent(showNumberCompleted);
    }, 800)
}

function showHealth()
{
    const li : HTMLElement | null = 
        document.getElementById("HealthPoint");
    
    if(li !== null)
    {
        li.innerHTML = "";
        for(let i = 0; i <= currentHP; i ++)
        {
            const img = document.createElement("img");
            img.src = heartSrc;
            li.appendChild(img);
        }
    }
}

function transitionToGuessPage()
{
    for (const d of NumDivs) 
    {
        d.classList.remove("Show");
        d.classList.add("Guess");
        d.onclick = () => HandleGuessNumberClicked(d);
    }
}

function HandleGuessNumberClicked(div : HTMLElement)
{
    div.onclick = null;
    div.classList.add("Chosen");
    let ans = answers.pop();
    if (chosenWrong.length === 0) 
    {
        if (div === ans) {
            chosenCorrect.push(div);
            //propergate selected, disable div, etc.
        }
        else
        {
            chosenWrong.push(div);
            //propergate failure
        }
    }
    if(answers.length === 0)
    {
        transitionToRoundEnd();
    }
}

function transitionToRoundEnd()
{
    for (const d of NumDivs) 
    {
        d.classList.remove("Guess");
        d.classList.remove("Chosen");
        d.classList.add("Show");
    }
    while(chosenCorrect.length > 0)
    {
        const d = chosenCorrect.pop();
        d?.classList.add("Correct");
    }
    didRoundWin = true;
    while(chosenWrong.length > 0)
    {
        didRoundWin = false;
        const d = chosenWrong.pop();

        d?.classList.add("Wrong");
    }

    if(didRoundWin)
    {
        console.log("didRoundWin: true, current diffi: " + game.difficulty);
        winAtLevel9++;
        if (winAtLevel9 === 3) {
            alert("您是神仙吧！");
        }

        gamePerformance[game.difficulty][1]++;
    } else {
        console.log("didRoundWin: false, current diffi: " + game.difficulty);
        currentHP--;
        winAtLevel9 = 0;
        showHealth();
        gamePerformance[game.difficulty][0]++;
    }

    setTimeout(() => {
        cleanUpRoundEnd();
        document.dispatchEvent(roundEnded);
    }, 3000)
}

function cleanUpRoundEnd()
{
    showNumberPage!.style.display = "none";

    while (NumDivs.length > 0) {
        const d = NumDivs.pop();
        d?.classList.remove("Correct");
        d?.classList.remove("Wrong");
        d?.classList.remove("Guess");
        d?.classList.remove("Chosen");
        d?.classList.remove("Show");
        d!.style.display = "none";
    }

    gameView.resetScreen();
}


function startGame()
{
    console.log("game started");
    document.dispatchEvent(startGameSelected);
}

function restartGame()
{
    console.log("game restarted");
    document.dispatchEvent(restartGameSelected);

}


function showNumeric(center : ScreenPoint, display : number) : void
{
    let r : number = gameView.radius * 3 / 5;

    let div : HTMLElement | null = 
        document.getElementById(
            "guessNumber_" + display);

    if (div !== null) {
        div.classList.add("Show");
        div.style.display = "block";
        div.style.left = (center.X - r) * 10 + "px";
        div.style.top = (center.Y - r) * 10 + "px";
        div.style.height = 20 * r + "px";
        div.style.width = 20 * r + "px";
        NumDivs.push(div);
    }
}

function showScoreCard()
{
    if (showScorePage !== null) {
        showScorePage.innerHTML = "";
        showScorePage.style.display = "block";
        for(let i = 4; i < 10; i ++)
        {
            let won : number = gamePerformance[i][1];
            let loss : number = gamePerformance[i][0];
            let total : number = won + loss;
            if (total > 0) {
                const scoreCard : HTMLDivElement = 
                document.createElement("div");
                scoreCard.classList.add("ScoreCard");

                const divDifficulty : HTMLDivElement = 
                    document.createElement("div");
                divDifficulty.classList.add("Difficulty");
                divDifficulty.textContent = "难度 " + i;
                scoreCard.appendChild(divDifficulty);

                const divScore : HTMLDivElement = 
                    document.createElement("div");
                divScore.classList.add("ScoreLabel");
                divScore.textContent = "" + won + "/" + loss;
                scoreCard.appendChild(divScore);

                showScorePage.appendChild(scoreCard);

            }
        }
    }
}