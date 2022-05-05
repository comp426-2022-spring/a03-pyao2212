//Initial stuff
const express = require("express");
const app = express();
const min = require('minimist');
const args = min(process.argv.slice(2));
args["port"];
const port = args.port || process.env.PORT || 5000; //default port 5000

//Start HTTP server on the indicated port
const server = app.listen(port, () => {
    console.log('App is running on %PORT%'.replace('%PORT%', port))
})

//Coin flip functions
function coinFlip() {
    if (Math.random() < 0.5) {
      return "heads";
    }
    else {
      return "tails";
    }
}

function coinFlips(flips) {
    var arr = [];
    for (let i = 0; i < flips; i++) {
        arr.push(coinFlip());
    }
    return arr;
}

function countFlips(array) {
    let h = 0;
    let t = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        h++;
      }
      if (array[i] == "tails") {
        t++;
      }
    }
    return {
      tails: t,
      heads: h
    }
}

function flipACoin(call) {
    let result = "lose";
    let flipResult = coinFlip();
    if (call == flipResult) {
      result = "win";
    }
    return {
      call: call,
      flip: flipResult,
      result: result
    }
}


//Express endpoints

app.get('/app/', (req, res) => {
  res.contentType('text/plain');
  res.status(200).end(200 + ' ' + "Good" );
})

app.get('/app/flip/', (req, res) => {
  res.contentType('application/json');
  res.status(200).json({ "flip" : coinFlip()});
})

app.get('/app/flips/:number([0-9]{1,3})', (req, res) =>{
  const arrayOfFlips = coinFlips(req.params.number);
  const counted = countFlips(arrayOfFlips)
  res.contentType('application/json');
  res.status(200).json({"raw": arrayOfFlips, "summary": counted});
})

app.get('/app/flip/call/:guess(heads|tails)/', (req, res) =>{
  res.contentType('application/json');
  res.status(200).json(flipACoin(req.params.guess));
})

app.use(function(req, res){
  res.contentType('text/plain');
  res.status(404).end(404 + ' ' + "Error not found");
})