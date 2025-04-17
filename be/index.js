const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const noteRoutes = require('./noteRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 
  
// Sử dụng các route từ noteRoutes
app.use('/api', noteRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});