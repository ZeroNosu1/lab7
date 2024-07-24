const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const books = require('./routes/books');
app.use('/api', books);

app.use("/", function(req, res) {
    res.send("Hello");
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
