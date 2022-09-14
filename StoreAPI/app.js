require("dotenv").config();
// async errors

const connectDB = require("./db/connect");
const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send(
		"<h1> Store API </h1> <a href='api/v1/products'>Products Route</a>"
	);
});

// products route

// notFound and errorHandler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
	try {
		const PORT = process.env.PORT || 5000;
		const URL = "localhost";

		await connectDB(process.env.MONGO_URI);
		console.log("MONGO DB connected successfully");
		app.listen(PORT, URL, () => {
			console.log("Listening on PORT : ", PORT);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();
