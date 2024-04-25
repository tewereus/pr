const asyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genre: genreOptions,
      movies,
    };
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
});

/*

const asyncHandler = require("express-async-handler");
const Movie = require("../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, search = "", sort = "rating", genre = "All" } = req.query;

  const allowedGenres = [
    "Action",
    "Romance",
    "Fantasy",
    "Drama",
    "Crime",
    "Adventure",
    "Thriller",
    "Sci-fi",
    "Music",
    "Family",
    "All",
  ];

  const allowedSort = ["rating", "title", "year"];

  if (isNaN(parseInt(page)) || isNaN(parseInt(limit)) || !allowedGenres.includes(genre)) {
    return res.status(400).json({ error: true, message: "Invalid parameters provided" });
  }

  let sortBy = {};
  if (allowedSort.includes(sort)) {
    sortBy[sort] = 1;
  } else {
    return res.status(400).json({ error: true, message: "Invalid sort parameter" });
  }

  let genreArr = genre === "All" ? allowedGenres : genre.split(",");

  const queryOptions = {
    name: { $regex: search, $options: "i" },
    genre: { $in: genreArr },
  };

  try {
    const movies = await Movie.find(queryOptions)
      .sort(sortBy)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const total = await Movie.countDocuments(queryOptions);

    const response = {
      error: false,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      genre: allowedGenres,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "An error occurred while fetching movies" });
  }
});

module.exports = { getMovies };

*/
