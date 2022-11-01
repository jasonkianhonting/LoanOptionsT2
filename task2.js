import fetch from "cross-fetch";

//This function is an async function that takes in 2 params and inject the first param into the URL itself just so that users
// can query the category of their desire in the command line. It is then converted to json and underwent a few error handling
// to ensure that the inputs provided are valid before undergoing sorting and extracting the first N number of arrays based
// on the number of input (limit) provided by the user. A try catch block is also applied for error handling
// @param: {String} - Category - category of the item to be extracted
// @param: {Integer} - Limit - maximum number of items to be extracted
async function fetchData(category, limit) {
	let answerArr = [];
	try {
		let request = await fetch(
			`https://api.publicapis.org/entries?category=${category}`
		);
		let response = await request.json();
		let result = response.entries;
		//if there are items in the result, continue otherwise inform user about no result
		if (result != undefined || result != null) {
			answerArr = answerArr.concat(result);
			//sorting function to sort the items in the array in a descending yet alphabetical order (Z-A)
			let sortedArr = answerArr.sort(function (initial, final) {
				//Declare the variables to be compared which is API and also ensure that all values are lowercase
				//to maintain consistency
				let initialItem = initial["API"].toLowerCase();
				let finalItem = final["API"].toLowerCase();
				return finalItem.localeCompare(initialItem);
			});
			//Extracting the number of items based on the user input (limit)
			let limitArr = sortedArr.slice(0, limit);
			console.log(limitArr);
		} else {
			console.log("No results");
		}
	} catch (error) {
		throw new Error(error.message);
	}
}

//This function is used to handle the inputs from the user by ensuring that the inputs from command line do not break the
//entire application by ensuring that the expected number of arguments (2) will always be present otherwise an error message
//will appear. Those user inputs are then used to match 2 regex which are made for alphabets and numbers only to ensure that
//special characters like % and $ will not be able to cause issues before inputting it into the first function defined
//to get the results provided. A try catch block is also applied for error handling
function finalResult() {
	try {
		if (process.argv.length != 4) {
			console.error("Expected two arguments: Category & Limit");
			process.exit(1);
		} else {
			let userInput = process.argv.slice(2);
			let categoryInput = userInput[0];
			let limitInput = userInput[1];

			//Declaring variables for regexes for its respective purposes- alphabets and number
			const alphabetsRegex = /^[A-Za-z]+$/;
			const numberRegex = /^[0-9]+$/;

			//If inputs match the regexes, proceed to use fetchData function to perform a get request
			if (
				categoryInput.match(alphabetsRegex) &&
				limitInput.match(numberRegex)
			) {
				//declare the variable to convert string to an integer
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
