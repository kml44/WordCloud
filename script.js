const game = {
    name: "",
    selectedWords: [],
    randomNum: 0,
    points:0, selectedGoodAnswers: 0,
    selectedBadAnswers: 0, goodAnswersNotSelected: 0,


    startGame() {
        this.name = document.querySelector("#textInput").value;
        if (this.name === "") return;

        this.randomNum = Math.floor(Math.random() * 3);
        this.gameElement = document.querySelector("#game");


        this.gameElement.innerHTML = "";
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        this.gameElement.appendChild(questionElement);

        questionElement.textContent = wordsApiData[this.randomNum]["question"]
        let wordsContainer = document.createElement("div");
        wordsContainer.classList.add("words-container");
        this.gameElement.appendChild(wordsContainer);


        wordsApiData[this.randomNum]["all_words"].forEach(e => {
            const word = document.createElement("div");
            word.classList.add("word");
            wordsContainer.appendChild(word);
            word.textContent = e;
            word.addEventListener("click", e => this.wordClick(e));
        });

        const buttonElement = document.createElement("button");
        buttonElement.classList.add("button");
        buttonElement.textContent = "check answers";
        this.gameElement.appendChild(buttonElement);
        buttonElement.addEventListener("click", e => this.checkAnswers(e));
    },
    wordClick(e) {
        if (!(this.goodAnswersNotSelected === 0 && this.selectedBadAnswers === 0 && this.selectedGoodAnswers === 0)) return;
        let found = false;
        for (let i = 0; i < this.selectedWords.length; i++) {
            if (this.selectedWords[i] === e.target.textContent) {
                this.selectedWords.splice(i, 1);
                e.target.style.color = "black";
                found = true;
            }
        }
        if (!found) {
            this.selectedWords.push(e.target.textContent);
            e.target.style.color = "blue";
        }

    },

    checkAnswers(e) {
        let container = document.querySelector(".words-container")

        function wrapAnswer(childElement, text, color) {
            childElement.style.paddingTop = "10px";
            let wrapper = document.createElement("div");
            wrapper.classList.add("word-wrapper")
            wrapper.textContent = text;
            wrapper.style.color = color;
            childElement.parentNode.insertBefore(wrapper, childElement);
            wrapper.appendChild(childElement);
        }

        for (let child in container.children) {
            let childElement = container.children[child];
            if (this.selectedWords.includes(childElement.textContent)){
                if (wordsApiData[this.randomNum]["good_words"].includes(childElement.textContent)){
                    wrapAnswer(childElement, "Good", '#08af00');
                    childElement.style.color = "green";
                    this.selectedGoodAnswers++;
                }else{
                    wrapAnswer(childElement, "Bad", '#ff8080');
                    childElement.style.color = "red";
                    this.selectedBadAnswers++;
                }
            }
        }

        wordsApiData[this.randomNum]["good_words"].forEach(node => {
            if (!this.selectedWords.includes(node)) this.goodAnswersNotSelected++;
        });

        let button = document.querySelector("button");
        button.addEventListener("click", listener => this.finishGame(listener));
        button.textContent = "finish game";
    },
    finishGame(e) {
        this.points = (this.selectedGoodAnswers * 2) - (this.selectedBadAnswers + this.goodAnswersNotSelected);
        document.querySelector("#game").innerHTML = `<h2>Congratulations, ${this.name}!</h2>` + `<h2>Your score:</h2>` +
        `<h2 style="color: #00adad">${this.points} points</h2>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.querySelector("#playButton");
    playButton.addEventListener("click", e => game.startGame());
});

const wordsApiData = JSON.parse("[\n" +
    "{\n" +
    "\"question\": \"select animals\",\n" +
    "\"all_words\": [\n" +
    "\"hole\",\n" +
    "\"sofa\",\n" +
    "\"pear\",\n" +
    "\"tiger\",\n" +
    "\"oatmeal\",\n" +
    "\"square\",\n" +
    "\"nut\",\n" +
    "\"cub\",\n" +
    "\"shirt\",\n" +
    "\"tub\",\n" +
    "\"passenger\",\n" +
    "\"cow\"\n" +
    "],\n" +
    "\"good_words\": [\n" +
    "\"tiger\",\n" +
    "\"cow\"\n" +
    "]\n" +
    "},\n" +
    "{\n" +
    "\"question\": \"select colors\",\n" +
    "\"all_words\": [\n" +
    "\"jeans\",\n" +
    "\"existence\",\n" +
    "\"ink\",\n" +
    "\"red\",\n" +
    "\"blue\",\n" +
    "\"yellow\",\n" +
    "\"laugh\",\n" +
    "\"behavior\",\n" +
    "\"expansion\",\n" +
    "\"white\",\n" +
    "\"black\",\n" +
    "\"cakes\"\n" +
    "],\n" +
    "\"good_words\": [\n" +
    "\"red\",\n" +
    "\n" +
    "\"blue\",\n" +
    "\"yellow\",\n" +
    "\"white\",\n" +
    "\"black\"\n" +
    "]\n" +
    "},\n" +
    "{\n" +
    "\"question\": \"select vehicles\",\n" +
    "\"all_words\": [\n" +
    "\"belief\",\n" +
    "\"wire\",\n" +
    "\"car\",\n" +
    "\"bus\",\n" +
    "\"star\",\n" +
    "\"river\",\n" +
    "\"hat\",\n" +
    "\"skirt\",\n" +
    "\"train\"\n" +
    "],\n" +
    "\"good_words\": [\n" +
    "\"car\",\n" +
    "\"bus\",\n" +
    "\"train\"\n" +
    "]\n" +
    "}\n" +
    "]")