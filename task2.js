// if (process.argv.length != 4) {
// 	console.error("Expected two argument!");
// 	process.exit(1);
// }
import fetch from "cross-fetch";

async function fetchData() {
	try {
		let request = await fetch("https://api.publicapis.org/entries");
		let response = await request.json();
		console.log(response);
	} catch (error) {
		throw new Error(error.message);
	}
}

