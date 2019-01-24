const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Setting
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

//mongoose.product.createIndex( { name: "text" } );

// Routes
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/person', require('./routes/person.routes'));
app.use('/api/move', require('./routes/move.routes'));
app.use('/api/promotion', require('./routes/promotion.routes'));
app.use('/api/oneMove', require('./routes/oneMove.routes'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Start server
app.listen(app.get('port'), () => console.log('Server on port ', app.get('port')));