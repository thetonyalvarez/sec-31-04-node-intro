const fs = require("fs");
const process = require("process");
const axios = require("axios");

const handleOutput = (path, output) => {
	// if output arg is passed through, we attempt to write to file
	if (output) {
		fs.writeFile(output, path, "utf8", (err) => {
			if (err) {
				console.log(`file write error:`, err);
				process.exit(1);
			} else {
				console.log("content output:", output);
			}
		});
	}
	// else if no output exists, we return the input and implicitly
	// assume the operation is a read-file operation
	else {
		console.log(path);
	}
};

const cat = (path, output) => {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			console.log("path", path);
			console.log("data", data);
			console.log("output", output);
			handleOutput(data, output);
		}
	});
};

const webCat = async (url, output) => {
	try {
		let res = await axios.get(url);
		handleOutput(res, output);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
};

let path;
let output;

if (process.argv[2] == "--out") {
	path = process.argv[4];
	output = process.argv[3];
	if (process.argv[4] < process.argv[process.argv.length - 1]) {
		for (let i = 5; i < process.argv.length; i++) {
			path.append(process.argv[i]);
		}
	}
} else {
	path = process.argv[2];
}

if (path.slice(0, 4) == "http") {
	webCat(path, output);
} else {
	cat(path, output);
}
