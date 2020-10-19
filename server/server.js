require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const cors = require('cors');
const app = express();


// MongoDB setup
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongodb')
});

// Middlewares
app.use(express.json());
app.use(cors());

//Route middlewares
app.use('/api/auth', authRoute);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})