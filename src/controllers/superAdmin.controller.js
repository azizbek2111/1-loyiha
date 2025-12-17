const express = require('express');
const SuperAdmin = require('../model/superAdmin.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;     
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSuperAdmin = new SuperAdmin({ username, password: hashedPassword, email });
        await newSuperAdmin.save();
        res.status(201).json({ message: 'SuperAdmin Muvaffaqiyatli royhatdan o\'tdi' });
    } catch (error) {
        res.status(500).json({ error: 'Royhatdan o\'tish amalga oshmadi' });
    }       
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const superAdmin = await SuperAdmin.findOne({ username });
        if (!superAdmin) {
            return res.status(400).json({ error: 'Login amalga oshmadi' });
        }   
        const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Login amalga oshmadi' });
        }

        const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Kirish muvaffaqiyatli amalga oshdi', token });
    } catch (error) {
        res.status(500).json({ error: 'Kirish amalga oshmadi' });
    }       
});

module.exports = router;