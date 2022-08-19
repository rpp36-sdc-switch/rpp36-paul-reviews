require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT;

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});