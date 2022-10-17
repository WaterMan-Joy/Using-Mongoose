const express = require('express');
const mongoose = require('mongoose');

const app = express();

main()
    .then(() => {console.log('MONGOOSE CONECT!');})
    .catch(err => { console.log(err)})

async function main() {
    await mongoose.connect('mongodb://localhost/relationshipDemo');
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id: false},
            street: String,
            city: String,
            state: String,
            county: String,
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Joy',
        last: 'Kim',
    })
    u.addresses.push({
        street: 'CHANG DONG 804',
        city: 'DOBONG',
        state: 'SEOUL',
        county: 'KOR'
    })
    const res = await u.save();
    console.log(res);
}

const addAdress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: 'CHANG 04',
        city: 'DOBONG',
        state: 'SEOUL',
        county: 'KOR'
    })
    const res = await user.save();
    console.log(res);
}

// makeUser();
addAdress('634cd2b36ecdfc5a636a0b1c');
