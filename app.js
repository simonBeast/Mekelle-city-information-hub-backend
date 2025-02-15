const express = require("express");
const cors = require('cors');
const app = express();
const userRouter = require('./routes/userRoute');
const communityRouter = require('./routes/communityRoute');
const cityServiceRouter = require('./routes/cityServiceRoute');
const emergencyRouter = require('./routes/emergencyRoute');
const eventRouter = require('./routes/eventRoute');
const localBusinessRouter = require('./routes/localBusinessRoute');
const errorHandleMW = require("./utils/errorHandleMW");

app.use(express.json());

// CORS configuration
app.use(cors({
  origin: '*', // Allow requests from this origin
}));

// Serve static files
app.use(express.static(__dirname + '/uploads/images'));

// Routes
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/cityService/', cityServiceRouter);
app.use('/api/v1/communityBullet/', communityRouter);
app.use('/api/v1/emergency/', emergencyRouter);
app.use('/api/v1/event/', eventRouter);
app.use('/api/v1/localBusiness/', localBusinessRouter);

// Error handling middleware
app.use(errorHandleMW);

module.exports = app;