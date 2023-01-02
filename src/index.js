const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();
const { default : mongoose } = require('mongoose')
mongoose.set('strictQuery', false)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://Chetan-functionUp:9EFNNLl4q6IIvejN@cluster0.evsfgyx.mongodb.net/Poject1_Group8?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("Mongo db is connected"))
.catch(err=>console.log(err))
app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
