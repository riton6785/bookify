const asynchHandler = require("express-async-handler");
const Genres = require("../Model/genres_model");

const createGenres = asynchHandler(async(req, res)=> {
    const {name} = req.body;
    let genres = await Genres.findOne({name});
    if (genres){
        return res.send({
            _id: genres._id,
            name: genres.name,
            book_ids: genres.book_ids,
        })
    }
    else {
        genres = await Genres.create({name});
        return res.send({
            _id: genres._id,
            name: genres.name,
            book_ids: genres.book_ids,
        })
    }
})

const getAllGenres = asynchHandler(async (req, res)=> {
    const genres = await Genres.find({});
    let results = []
    genres.map((genre)=>{
        const option = {
            name: genre.name,
            _id: genre._id,
        }
        results.push(option)
    })
    res.send(results);
})

const setBooksintotheGenres = asynchHandler(async(genres_id, book_id) => {
    genres_id.forEach(async(genre_id)=> {
        await Genres.findByIdAndUpdate(genre_id, { $addToSet: { book_ids: book_id } }, { new: true })
    })
})

const getGenresCount = asynchHandler(async(req, res)=> {
    const data = await Genres.countDocuments();
    res.send(data);
})

module.exports= {createGenres, getAllGenres, setBooksintotheGenres, getGenresCount};
