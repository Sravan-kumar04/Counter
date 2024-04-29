const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://sravan:sravan@cluster0.mi7wwv5.mongodb.net/counter_DB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

const myCounterSchema = new mongoose.Schema({
    myCount: { type: Number, default: 0 },
});

const MyCounter = mongoose.model('MyCounter', myCounterSchema);

// Routes
app.get('/api/counter', async (req, res) => {
    try {
        const counter = await Counter.findOne();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count++;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count--;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/api/my-counter', async (req, res) => {
    try {
        const myCounter = await MyCounter.findOne();
        res.json(myCounter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/my-counter/increment', async (req, res) => {
    try {
        let myCounter = await MyCounter.findOne();
        if (!myCounter) {
            myCounter = new MyCounter();
        }
        myCounter.myCount++;
        await myCounter.save();
        res.json(myCounter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/my-counter/decrement', async (req, res) => {
    try {
        let myCounter = await MyCounter.findOne();
        if (!myCounter) {
            myCounter = new MyCounter();
        }
        myCounter.myCount--;
        await myCounter.save();
        res.json(myCounter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});