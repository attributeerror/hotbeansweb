const express = require("express");
const app = express();
const { join } = require("path");

app.use(express.static("public"));

app.get("/", (req, res, next) => {
	res.sendFile("index.html", {
		root: join(__dirname, "public"),
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true
		}
	}, err => {
		if(err) {
			next(err);
		} else {
			console.log("Sent: " + fileName);
		}
	});
});

app.use((err, req, res, next) => {
	if(err) console.log(err.stack || err);
	res.status(500).json(err);
});

app.listen(8004, () => console.log("Listening on port 8004"));