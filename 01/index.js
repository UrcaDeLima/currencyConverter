const express    = require('express');
const exphbs     = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path       = require('path');
const PORT       = process.env.PORT || 3000;
const app        = express();
const hbs        = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.use(todoRoutes);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

async function start() {
  try {
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  }catch(e) {
    console.log(e);
  }
}

start();
