import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

const main = async () => {
	dotenv.config();

	const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	const port = process.env.PORT || 8000;

	try {
		await client.connect();
		await MoviesDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);

		app.listen(port, () => {
			console.log(`server is running on port ${port}`);
		});
	} catch (e) {
		console.log(e);
		process.exit;
	}
};

main().catch(console.error);
