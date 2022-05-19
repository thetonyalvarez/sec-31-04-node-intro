const fs = require("fs");
const axios = require("axios");

const cat = (path) => {
	fs.readFile(path, "utf8", function (err, data) {
		if (err) {
			// handle possible error
			console.error(err);
			// kill the process and tell the shell it errored
			process.exit(1);
		}
		// otherwise success
		console.log(data);
	});

	console.log("reading file");
	// file won't have been read yet at this point
};

const webCat = async (url) => {
	try {
		let res = await axios.get(url);
		console.log(res.data);
	} catch (err) {
		// handle possible error
		console.error(`Error fetching ${url}: ${err}`);
		// kill the process and tell the shell it errored
		process.exit(1);
	}
};

let path = process.argv[2];

if (path.slice(0, 4) == "http") {
	webCat(path);
} else {
	cat(path);
}
