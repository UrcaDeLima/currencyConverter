const express    = require('express')
//const mongoose   = require('mongoose')
const exphbs     = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path       = require('path')
const PORT       = process.env.PORT || 3000
const app        = express()
//var wrk = require('wrk');
const hbs        = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.use(todoRoutes)
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

async function start() {
  try {
    // await mongoose.connect(
    //   'mongodb+srv://Oleg:1q2w3e4r@cluster0-wt6hi.mongodb.net/test',
    //   {
    //     useNewUrlParser: true,
    //     useFindAndModify: false
    //   }
    // )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })

  } catch (e) {
    console.log(e)
  }
}

start()

// console.log(11);
// var conns = 1;
// var results = [];
//
// function benchmark() {
//   if (conns === 100) {
//     return console.log(results);
//   }
//   conns++;
//   wrk({
//     threads: 1,
//     connections: conns,
//     duration: '10s',
//     printLatency: true,
//     headers: { cookie: 'JSESSIONID=abcd' },
//     url: 'http://localhost:3000/'
//   }, function(err, out) {
//      results.push(out);
//      benchmark();
//   });
// }
// benchmark();
