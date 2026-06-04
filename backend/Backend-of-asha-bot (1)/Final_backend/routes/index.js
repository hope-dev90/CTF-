const express= require ('express');
const router= express.Router();

const chatRouters= require('./chat.routes');

router.use('/chat', chatRouters);

module.exports= router;