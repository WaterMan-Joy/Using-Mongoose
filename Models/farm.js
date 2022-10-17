const express = require('express');
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


const app = express();


main()
    .then(() => {console.log('MONGOOSE CONECT!');})
    .catch(err => { console.log(err)})

async function main() {
    await mongoose.connect('mongodb://localhost/relationshipDemo');
}


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;


const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        eunm: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: ObjectId,
        ref: 'Product',
    }],
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);


// Product.insertMany([
//     {name: 'apple', price: 2300, season: 'Summer'},
//     {name: 'wtermalon', price: 4300, season: 'Fall'},
//     {name: 'tomato', price: 1200, season: 'Winter'},
// ])

// const makeFarm = async () => {
//     const farm = new Farm({name: 'Joy Kim', city: 'Seoul'})
//     const apple = await Product.findOne({ name: 'apple' })
//     farm.products.push(apple);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Joy Kim' })
    const tomato = await Product.findOne({ name: 'tomato' })
    if (tomato !== null) {
        farm.products.push(tomato);
        await farm.save();
    }
    else {
        console.log('err')
    }
}

// addProduct();

Farm.findOne({ name: 'Joy Kim' })
    .populate('products')
    .then(farm => console.log(farm))