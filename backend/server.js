require('dotenv').config()

const express = require('express')
const cors = require('cors');
const { Pool } = require('pg');

// Routes
const itemRoutes = require('./routes/items')
const userRoutes = require('./routes/users')
const authController = require('./controllers/authController');
const checkoutController = require('./controllers/checkoutController');

// the express app
const app = express ()

// cors
app.use(cors());

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes 
app.use('/api/items', itemRoutes)
app.use('/api/users', userRoutes)
app.post('/api/login', authController.login);
app.post('/api/checkout', checkoutController.processCheckout);


  const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'yjw',
      password: 'Tuskan32',
      port: 5432,
      schema: 'kpopshop',
    });
    
  // Connect to the PostgreSQL database
  pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));
  
  // Listen for requests
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
  