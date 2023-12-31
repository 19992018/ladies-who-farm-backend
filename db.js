const mongoose = require('mongoose');
const db = (async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
})();