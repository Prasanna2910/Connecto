const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

let app = express();
app.use(cors());

app.listen(3553, async () => {
  console.log('Port listening to 3553 port');
});
