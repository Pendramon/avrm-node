const fileService = require('./fileService');

const file = "blogs.json";

const index = (req, res) => {
    res.send("Hello World!");
};

const getBlogs = (req, res) => {
    fileService.readFile(file)
        .then((blogs) => {
            let data = {
                blogs: JSON.parse(blogs)
            }
            res.render('blogs', data);
        })
        .catch(err => {
            console.log(err);
            res.send("An error has occured on the server.");
        });
};

module.exports = {
    index,
    getBlogs
};