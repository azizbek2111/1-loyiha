const express = require('express');
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ['admin', 'editor', 'viewer'],
        default: 'viewer'   
    }
});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;