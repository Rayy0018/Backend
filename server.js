const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const PORT = 8080;
const mongoose = require('mongoose');
app.use(morgan("dev"));
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");


const MONGODB_URI = 'mongodb+srv://shreya2211:Backend@cluster0.d36it0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    pdfPath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);
const apiRoutes = require("./api/apiRoutes");
app.use("/api", apiRoutes);


app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/books', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pdfPath: req.body.pdfPath
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "intro.html"));
});
app.get("/api/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/api/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "aboutus.html"));
});

app.get("/api/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});
app.get("/api/genre1", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre1.html"));
});

app.get("/api/genre3", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre3.html"));
});

app.get("/api/genre", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre.html"));
});
app.get("/api/genre2", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "genre2.html"));
});

app.get("/api/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.use(express.static(path.join(__dirname, 'public2')));
app.get('/public2/main', (req, res) => {
    res.sendFile(path.join(__dirname,  'public2', 'main.html'));
});

app.get('/book1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book1.html'));
});

app.get('/book2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book2.html'));
});
app.get('/book3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book3.html'));
});

app.get('/book4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book4.html'));
});

app.get('/book5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book5.html'));
});

app.get('/book6', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book6.html'));
});

app.get('/book7', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book7.html'));
});

app.get('/book8', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book8.html'));
});

app.get('/book9', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book9.html'));
});

app.get('/book10', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book10.html'));
});

app.get('/book11', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book11.html'));
});

app.get('/book12', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book12.html'));
});

app.get('/book13', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book13.html'));
});

app.get('/book14', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book14.html'));
});

app.get('/book15', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'book15.html'));
});

app.get('/pdfs/book1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book1.pdf'));
});

app.get('/pdfs/book2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book2.pdf'));
});

app.get('/pdfs/book3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book3.pdf'));
});

app.get('/pdfs/book4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book4.pdf'));
});

app.get('/pdfs/book5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book5.pdf'));
});

app.get('/pdfs/book6', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book6.pdf'));
});

app.get('/pdfs/book7', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book7.pdf'));
});

app.get('/pdfs/book8', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book8.pdf'));
});

app.get('/pdfs/book9', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book9.pdf'));
});

app.get('/pdfs/book10', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book10.pdf'));
});

app.get('/pdfs/book11', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book11.pdf'));
});

app.get('/pdfs/book12', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book12.pdf'));
});

app.get('/pdfs/book13', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book13.pdf'));
});

app.get('/pdfs/book14', (req, res) => {
    res.sendFile(path.join(__dirname, 'public2', 'pdfs', 'book14.pdf'));
});

app.get('/pdfs/book15', (req, res) => {
    res.sendFile(path.join(__dirname,'public2', 'pdfs', 'book15.pdf'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});