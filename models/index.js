'use strict';

const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../src/modules');

const allModels = {};
const allAssociations = {};

// Load all models
fs.readdirSync(modulesDir).forEach(moduleName => {
    const modelPath = path.join(modulesDir, moduleName);
    const stat = fs.statSync(modelPath);
    if (stat.isDirectory()) {
        const model = path.join(modelPath, `models`, `${moduleName}.model.js`);
        if (fs.existsSync(model)) {
            allModels[moduleName] = require(model);
        }
    }
});
console.log(allModels, "Models loaded successfully.")

// Load all associations
fs.readdirSync(modulesDir).forEach(moduleName => {
    const associationPath = path.join(modulesDir, moduleName);
    const stat = fs.statSync(associationPath);
    if (stat.isDirectory()) {
        const association = path.join(associationPath, `associations`, `${moduleName}.association.js`);
        if (fs.existsSync(association)) {
            allAssociations[moduleName] = require(association);
        }
    }
});
console.log(allAssociations, "Associations loaded successfully.")
module.exports = allModels 
