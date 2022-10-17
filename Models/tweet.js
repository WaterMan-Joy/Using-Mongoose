const mongoose = require('mongoose');

main()
    .then(() => {console.log('MONGOOSE CONECT!');})
    .catch(err => { console.log(err)})

async function main() {
    await mongoose.connect('mongodb://localhost/relationshipDemo');
}

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    like: Number,
    user: {
        type: ObjectId,
        ref: 'User',
    }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweet = async () => {
    const user = new User({ username: 'Joy Kim', age: 30 });
    const tweet1 = new Tweet({ text: "I'm Swimmer", like: 2 })
    tweet1.user = user;
    await user.save();
    await tweet1.save()
}

const addTweet = async () => {
    const user = await User.findById({ _id: '634ced37d9de59bd310ea508' })
    const tweet = new Tweet({ text: 'hi hello!!', like: 1 })
    tweet.user = user
    await tweet.save()
}

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
}


// findTweet();
// makeTweet();
// addTweet();