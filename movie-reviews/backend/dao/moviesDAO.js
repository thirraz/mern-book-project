//DAO -> data access object
let movies;

export default class MoviesDAO {
	static async injectDB(conn) {
		if (movies) {
			return;
		}

		try {
			movies = await conn
				.db(process.env.MOVIEREVIEWS_NS)
				.collection("movies");
		} catch (e) {
			console.error(`unable to connect in MoviesDAO: ${e}`);
		}
	}

	static async getMovies({
		//default filter
		filters = null,
		page = 0,
		moviesPerPage = 20, // 20 movies at once
	} = {}) {
		let query;
		if (filters) {
			if (filters.hasOwnProperty("title")) {
				query = { $text: { $search: filters["title"] } };
			} else if (filters.hasOwnProperty("rated")) {
				query = { rated: { $eq: filters["rated"] } };
			}
		}

		let cursor;
		try {
			cursor = await movies
				.find(query)
				.limit(moviesPerPage)
				.skip(moviesPerPage * page);

			const moviesList = await cursor.toArray();
			const totalNumMovies = await movies.countDocuments(query);
			return { moviesList, totalNumMovies };
		} catch (e) {
			console.log(`Unable to issue find command, ${e}`);
			return { moviesList: [], totalNumMovies: 0 };
		}
	}
}
