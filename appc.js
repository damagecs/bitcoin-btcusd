express = require('express')
stylus = require('stylus')
nib = require('nib')
request = require('request')
app = express()

compile = (str, path) ->
  stylus(str).set('filename', path).use nib()

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.logger('dev')
app.use stylus.middleware(
  src: __dirname + '/public'
  compile: compile)
app.use express.static(__dirname + '/public')

app.get '/', (req, res, next) ->
  request 'https://www.bitstamp.net/api/v2/ticker/btcusd/', (err, response, body) ->
    if err or response.statusCode != 200
      return res.sendStatus(500)
    res.render 'index',
      title: 'Alex'
      last: JSON.parse(body).last
      high: JSON.parse(body).high
      low: JSON.parse(body).low
    return
  return
app.listen 3000