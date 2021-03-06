const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Hello Express! I bet you weren\'t expecting me!');
})

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers! So juice! Much beef!');
})

app.get('/pizza/pepperoni' , (req, res) => {
  res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
  res.send('We don\'t serve that here. Never call again!');
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end() //do not send any data back to the client
})

app.get('/greetings', (req, res) => {
  const name = req.query.name;
  const race = req.query.race;
  const hair = req.query.hair;

  if(!name) {
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    return res.status(400).send('Please provide a race');
  }
  const greeting = `Greetings ${name} the ${race}, with ${hair} locks, welcome to our kingdom.`;

  res.send(greeting);
})

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  const c = a + b;

  const answer = `The sum of ${a} and ${b} is ${c}`
  res.send(answer);

})

app.get('/cipher', (req, res) => {
  text = req.query.text; //"Hello"
  shift = Number(req.query.shift); //"4" => 4

  let textArr = text.split('');
  let textNum = [];

  textNum = textArr.map(letter => {
    return textNum + (letter.charCodeAt() + shift);
  })

  let newText = [];

  newText = textNum.map(num => {
    return newText + (String.fromCharCode(num));
  })

  const shiftedText =  newText.join('');
  res.send(shiftedText);
})

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;

  const guesses = numbers.map(n => parseInt(n).filter(n => !Number.isNaN(n) && n <= 20));

  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  let diff = winningNumbers.filter(n => !guesses.includes(n));

  let responseText;

  switch(diff.length) {
    case 0: 
      responseText = 'Wow! Unbelieveable! You could have won the mega millions!';
      break;
    case 1:
      responseText = 'Congratulations! You won $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';
  }

  res.send(responseText);
})

app.listen(8080, () => {
  console.log('Express server is listening on port 8080!');
})