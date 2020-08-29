const express = require('express');
const indexRoute = require('./routes/index.route');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/v1', indexRoute);

app.listen(port, () => {
  console.log(`The App is responding to a server at PORT ${port}`);
});
