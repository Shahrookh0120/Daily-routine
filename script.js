const inputFeild = document.querySelectorAll(".input-field");
const inputChecked = document.querySelectorAll(".custom-checkbox");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const completedCount = document.querySelector(".completed-count");
const quotes = document.querySelector(".quotes");
const addRoutinebtn = document.querySelector("#routineAddbtn");

const quotesArray = [
	"Raise the bar by completing your goals!",
	" Well begun is half done!",
	"Just a step away, keep going!",
	"Just a step away, keep going!",
	"Whoa! You just completed all the goals, time for chill :D",
];

const allRoutine = JSON.parse(localStorage.getItem("allRoutine")) || {};
let completedLenght = Object.values(allRoutine).filter(
	(routine) => routine.completed
).length;
progressValue.style.width = `${(completedLenght / parseInt(inputChecked.length)) * 100}%`;
completedCount.innerText = `${completedLenght}/${inputChecked.length} completed`;
quotes.innerText = quotesArray[completedLenght];

inputChecked.forEach((checkbox) => {
	checkbox.addEventListener("click", (e) => {
		const allInputFeild = [...inputFeild].every((input) => {
			return input.value;
		});
		if (allInputFeild) {
			checkbox.parentElement.classList.toggle("complted-routine");
			const inputID = checkbox.nextElementSibling.id;
			allRoutine[inputID].completed = !allRoutine[inputID].completed;
			completedLenght = Object.values(allRoutine).filter(
				(routine) => routine.completed
			).length;
			quotes.innerText = quotesArray[completedLenght];
			completedCount.innerText = `${completedLenght}/${inputChecked.length} completed`;
			progressValue.style.width = `${
				(completedLenght / parseInt(inputChecked.length)) * 100
			}%`;
			localStorage.setItem("allRoutine", JSON.stringify(allRoutine));
		} else {
			errorLabel.style.display = "block";
		}
	});
});

inputFeild.forEach((input) => {
	if (allRoutine[input.id]) {
		input.value = allRoutine[input.id].name;
		if (allRoutine[input.id].completed) {
			input.parentElement.classList.add("complted-routine");
		}
	}

	input.addEventListener("click", () => {
		errorLabel.style.display = "none";
	});
	input.addEventListener("input", () => {
		if (allRoutine[input.id] && allRoutine[input.id].completed) {
			input.value = allRoutine[input.id].name;
			return;
		}
		if (allRoutine[input.id]) {
			allRoutine[input.id].name = input.value;
		} else {
			allRoutine[input.id] = { name: input.value, completed: false };
		}
		localStorage.setItem("allRoutine", JSON.stringify(allRoutine));
	});
});
// appending new with button

