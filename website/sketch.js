
/* function when index.html is loaded */
function setup() {
  createCanvas(950,900);
  //drawData();
  console.log('running');

  var button = select('#submit');
  button.mousePressed(submitWord);

  var buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);

  var buttonS = select('#show');
  buttonS.mousePressed(drawData);

  /* function to submit and save input */
  function submitWord(){
    var word = select('#word').value();
    var price = select('#price').value();
    console.log(word,price)

    loadJSON('add/' + word + '/' + price, function finished(data){
      console.log(data);
      drawData();
    });
  }
}

/* function to get data from /all */
function drawData(){
  loadJSON('/all', gotData);
}

/* function to parse and orgasnize data */
function gotData(data){
  console.log(data);
  background(30);
  var x = 50;
  var y = 50;
  var keys = Object.keys(data);
  for(var i = 0; i < keys.length; i++){
    var words = keys[i];
    var price = data[words];
    y = y+20;
    var combined_words = ["• " + words + ": " + price];
    fill(300);
    textSize(16);
    text(combined_words,x,y);
  }
  console.log(keys);
}


/* function analyze */
function analyzeThis(){
  var txt = select('#textinput').value();
  var data = {
    text: txt,
  }
  httpPost('analyze/', data, 'json', function dataPosted(result){
    console.log(result);
  }, function postErr(err){
    console.log(err);
  });
}