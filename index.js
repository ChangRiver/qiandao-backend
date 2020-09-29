var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    mongoose = require('mongoose');


var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

if(!isProduction) {
    app.use(errorhandler());
}

if(isProduction) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/qiandao');
    mongoose.set('debug', true);
}

var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
})