const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const noteRoutes = require('./noteRoutes');

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
// Sử dụng các route từ noteRoutes
app.use('/api', noteRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});