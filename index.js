const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));
// to serve static files like css, images, ...
app.use(express.urlencoded({ extended: true }));
// it is a middleware that parses incoming request bodies in the URL-encoded format. It is required when you want to retrieve form data that is submitted through a POST reques

// case of mongoose connection error
main().catch(err => console.log(err));

// case of mongoose connection success
async function main() {
    // Step 1: Connect to MongoDB using Mongoose
    await mongoose.connect('mongodb://127.0.0.1:27017/AMS');

    // Step 2: Define a schema for your data
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        contact: String
    });

    // Step 3: Create a model based on the schema
    const User = mongoose.model('User', userSchema);

    // Step 4: Handle the form submission using Node.js
    app.post('/', (req, res) => {
        const userData = new User(req.body); // assuming you're using a form with POST method

        console.log(req.body);
        userData.save().then(() => {
            res.send("This item has been saved to the database");
        }).catch((err) => {
            res.status(400).send("Item was not saved to the database", err);
        });
    });

    // show database to DOM
    // User.find({ name: 'Suraj Kumar Yadav' }) // show according to query
    User.find({}) // show all data
        .then(docs => {
            html = '<ul>';
            docs.forEach(doc => {
                html += `<li>Name: ${doc.name}, Email: ${doc.email}, Conctact: ${doc.contact}</li>`;
            });
            html += '</ul>';
            console.log(docs);
            console.log(html);
            // res.send(html);
            // Do something with the documents here
        })
        .catch(err => {
            console.error(err);
        });
}

//* home page
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'signup_page.html');
    res.status(200).sendFile(filePath);
});

app.get('/showdata', (req, res) => {
    res.send(html)
    // const filePath = path.join(__dirname, 'signup_page.html');
    // res.status(200).sendFile(filePath);
});

//* server started
app.listen(3000, () => {
    console.log('Server started on port http://localhost:3000');
});