const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB:", err));


// Routes
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
