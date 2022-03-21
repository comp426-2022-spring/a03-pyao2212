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
const successStatusCode = 200;
const successStatusMessage = "good"

app.get('/app/', (req, res) => {
    res.status(successStatusCode).end(successStatusCode + ' ' + successStatusMessage );
    res.type("text/plain");
})

app.get('/app/flip/', (req, res) => {
    res.status(successStatusCode).json({ "flip" : coinFlip()});
})

app.get('/app/flips/:number([0-9]{1,3})', (req, res) =>{
    res.status(successStatusCode).json({"raw": coinFlips(req.params.number), "summary": countFlips(flips_arr)});
})

app.get('/app/flip/call/:guess(heads|tails)/', (req, res) =>{
    res.status(successStatusCode).json(flipACoin(req.params.guess));
})

app.use(function(req, res){
    res.status(statusCode).end(404 + ' ' + "Error note found");
    res.type("text/plain");
})