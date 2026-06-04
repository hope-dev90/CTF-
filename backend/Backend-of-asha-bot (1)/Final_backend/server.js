require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi= require('swagger-ui-express');
const swaggerSpec= require('./config/swagger');


const connectDB =require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');


const app = express();

//connect Database

connectDB();

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//health check 

app.get('/', (req, res)=>{

    res.json({message: "Asha CORE API is running"});
    
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//API routes

app.use('/api/chat', routes);

//error handling 

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);

});

