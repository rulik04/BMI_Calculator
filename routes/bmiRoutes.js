const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();
const bmiResults = [];

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use(express.json());

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

router.post('/', (req, res) => {
    const params = req.body;

    const age = params.age;
    const unit = params.unit;
    const gender = params.gender;
    const bmi = calculateBMI(params.height, params.weight, unit);
    const category = getBMICategory(bmi, gender, age);
    const time = params.time;

    bmiResults.push({
        age: age,
        height: params.height,
        weight: params.weight,
        bmi: bmi,
        category: category,
        unit: unit,
        gender: gender,
        time: time
    });

    res.send({
        age: age,
        height: params.height,
        weight: params.weight,
        bmi: bmi,
        category: category,
        unit: unit,
        gender: gender,
        time: time
    });

    res.status(200).end();
});

router.get('/results', (req, res) => {
    res.send(bmiResults);
});

router.get('/history', (req, res) => {
    const filePath = path.join(__dirname, '../public/history.html');
    res.sendFile(filePath);
});

router.get('/about', (req, res) => {
    const filePath = path.join(__dirname, '../public/about.html');
    res.sendFile(filePath);
});

router.get('/historyResults', (req, res) => {
    res.send(bmiResults);
});


function calculateBMI(height, weight, unit) {
    if (unit == "metric") {
        height = height / 100;
    }
    let bmi = weight / (height * height);
    if (unit == "imperial") {
        bmi = bmi * 703;
    }
    return bmi;
}


function getBMICategory(BMI, gender, age) {
    let category;

    switch (gender) {
        case "male":
            category = getMaleCategory(BMI, age);
            break;
        case "female":
            category = getFemaleCategory(BMI, age);
            break;
    }

    return category;
}

function getMaleCategory(BMI, age) {
    switch (true) {
        case age <= 24:
            return getMaleCategoryByAge(BMI, 20, 25, 30, 40);
        case age <= 34:
            return getMaleCategoryByAge(BMI, 21, 26, 31, 41);
        case age <= 44:
            return getMaleCategoryByAge(BMI, 22, 27, 32, 42);
        case age <= 54:
            return getMaleCategoryByAge(BMI, 23, 28, 33, 43);
        case age <= 64:
            return getMaleCategoryByAge(BMI, 24, 29, 34, 44);
        case age >= 65:
            return getMaleCategoryByAge(BMI, 25, 30, 35, 45);
    }
}

function getFemaleCategory(BMI, age) {
    switch (true) {
        case age <= 24:
            return getFemaleCategoryByAge(BMI, 19, 24, 29, 39);
        case age <= 34:
            return getFemaleCategoryByAge(BMI, 20, 25, 30, 40);
        case age <= 44:
            return getFemaleCategoryByAge(BMI, 21, 26, 31, 41);
        case age <= 54:
            return getFemaleCategoryByAge(BMI, 22, 27, 32, 42);
        case age <= 64:
            return getFemaleCategoryByAge(BMI, 23, 28, 33, 43);
        case age >= 65:
            return getFemaleCategoryByAge(BMI, 24, 29, 34, 44);
    }
}

function getMaleCategoryByAge(BMI, underweight, normalWeight, overweight, obesity) {
    switch (true) {
        case BMI < underweight:
            return "underweight";
        case BMI < normalWeight:
            return "normal weight";
        case BMI < overweight:
            return "overweight";
        case BMI < obesity:
            return "obesity";
        default:
            return "obesity of the 3rd degree";
    }
}

function getFemaleCategoryByAge(BMI, underweight, normalWeight, overweight, obesity) {
    switch (true) {
        case BMI < underweight:
            return "underweight";
        case BMI < normalWeight:
            return "normal weight";
        case BMI < overweight:
            return "overweight";
        case BMI < obesity:
            return "obesity of the 1st-2nd degree";
        default:
            return "obesity of the 3rd degree";
    }
}


module.exports = router;
