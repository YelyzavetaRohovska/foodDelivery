const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        keepAlive: 1,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connection to DB established successfully');
    }).catch((error) => {
        console.log(`There was some error connection to DB: ${error}`);
    });

    return mongoose.connection;
};