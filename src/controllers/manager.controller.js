const managerSchema = require('../model/manager.model');
const Manager = require('../model/manager.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerManager = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newManager = new Manager({ name, email, password: hashedPassword, role });
        await newManager.save();
        res.status(201).json({ message: 'Manager muvaffaqiyatli ro\'yxatdan o\'tdi' });
    } catch (error) {
        res.status(500).json({ error: 'R\oyhatdan o\'tishda xatolik yuz berdi' });
    }
        
};

exports.loginManager = async (req, res) => {
    try {
        const { email, password } = req.body;
        const manager = await Manager.findOne({ email });
        if (!manager) {
            return res.status(400).json({ error: 'Loginda xatolik yuz berdi' });
        }   
        const isPasswordValid = await bcrypt.compare(password, manager.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Loginda xatolik yuz berdi' });
        }
        const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login muvaffaqiyatli', token });
    } catch (error) {
        res.status(500).json({ error: 'Loginda xatolik yuz berdi' });
    }   
};  

module.exports = {
    registerManager,
    loginManager
};  


