
/* requires */
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

// Raw data from the file
var data = fs.readFileSync('words.json');
var wordsDict = JSON.parse(data);
console.log(wordsDict);


/* Create Server */
var app = express();
var port = 5000;
var server = app.listen(port, listening);

/* define app mode */
app.use(express.static('website'));

/* parse app/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({extended:false}));

/* parse app/json */
app.use(bodyParser.json());

/* function which listens when server is running */
function listening(){
  console.log("Server is running on  " + port)
}


//search is the route followed by something that user enters
// /search/:computer -> data.computer
/* search/something
   search/pizza
   search/computers
   */

/* GET addWord */
app.get('/add/:word/:price?', addWord);

/* GET sendAll */
app.get('/all', sendAll);

/* GET searchWord */
app.get('/search/:word/', searchWord);

/* POST analyze */
app.post('/analyze', analyzeThis);


/* function addWord to the server */
function addWord(request, response){
  var data = request.params;
  var word = data.word;
  var price = Number(data.price);
  var reply;
  
  if(!price || !Number.isInteger(price)){
    reply = {
      msg: "Price as integer is required"
    }
    response.send(reply);
  }else{
    wordsDict[word] = price;
    var json_data = JSON.stringify(wordsDict, null, 2);
    fs.writeFile('words.json',json_data, function finished(err) {
      console.log('all set.');
      reply = {
        msg: "Thank you for your word",
        word: word,
        price: price,
        status: "success" 
      }
      response.send(reply);
    });

  }

}


/* function send all data from the server */
function sendAll(request, response){
  response.send(wordsDict);
}


/* function to search any word on the server */
function searchWord(request, response){
  var word = request.params.word;
  var reply;
  if(wordsDict[word]){
    reply = {
      status: "found",
      word: word,
      price: wordsDict[word]
    }
  }else{
    reply = {
      status: "not found",
      word: word,
      Database: wordsDict
    }
  }
  response.send(reply);
}


/* function to analyze data via post request */
function analyzeThis(request, response){
  console.log(request.body);
  var reply = {
    msg: 'thank you'
  }

  response.send(reply);
}