const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    //validate data
    const { error } = registerValidation(req.body);
    if (error) res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('The email is already exists!');


    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).send('New user has been registered!');
        console.log('New user registered!')
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist.');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password.');

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).json({
        email: user.email,
        token
    })
});

router.post('/token', async (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).send('Not auth');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        res.status(200).send('Token auth completed!');
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
})

module.exports = router;