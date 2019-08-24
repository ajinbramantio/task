const mongoose = require('mongoose')

const MONGODB_CONNECTION =
  process.env.MONGODB_URI || `mongodb://localhost:27017/database_name`

mongoose.set('useCreateIndex', true)
mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('DB Connect')
  })

module.exports = mongoose
