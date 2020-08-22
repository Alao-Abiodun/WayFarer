const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The App is responding to a server at PORT ${PORT}`);
})

