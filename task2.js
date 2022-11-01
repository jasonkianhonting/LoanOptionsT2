import fetch from "cross-fetch";

async function fetchData(category, limit) {
	let answerArr = [];
	try {
		let request = await fetch(
			`https://api.publicapis.org/entries?category=${category}`
		);
		let response = await request.json();
		let result = response.entries;
		if (result != undefined || result != null) {
			answerArr = answerArr.concat(result);
			let sortedArr = answerArr.sort(function (initial, final) {
				let initialItem = initial["API"].toLowerCase();
				let finalItem = final["API"].toLowerCase();
				return finalItem.localeCompare(initialItem);
			});
			let limitArr = sortedArr.slice(0, limit);
			console.log(limitArr);
		} else {
			console.log("No results");
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

function finalResult() {
	try {
		if (process.argv.length != 4) {
			console.error("Expected two arguments: Category & Limit");
			process.exit(1);
		} else {
			let userInput = process.argv.slice(2);
			let categoryInput = userInput[0];
			let limitInput = userInput[1];

			const characterRegex = /^[A-Za-z]+$/;
			const numberRegex = /^[0-9]+$/;
			if (
				categoryInput.match(characterRegex) &&
				limitInput.match(numberRegex)
			) {
				let intLimitInput = parseInt(limitInput);
				fetchData(categoryInput, intLimitInput);
			} else {
				console.log(
					"Please input a valid category (alphabets) & a valid number (limit)"
				);
			}
		}
	} catch (err) {
		throw new Error(err.message);
	}
}

finalResult();
