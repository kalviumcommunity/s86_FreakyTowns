// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/towns');
const userRoutes = require('./routes/users');
const entityRoutes = require('./routes/sqlEntities');
const { authenticateDatabase } = require('./sqlConfig/mysql');

require('./models/sqlAssociations');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use("/api", entityRoutes);

const PORT = process.env.PORT || 3000;


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);






mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
    });

    // SQL Connection
authenticateDatabase();

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the FreakyTowns API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
