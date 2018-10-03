const express = require('express');
const app = express();


const deck = require('./Deck');
const game = require('./Game');

app.use(express.json()); 


app.get('/', (req, res) => {
  res.json(game);
});

app.use(function(req, res, next){
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));