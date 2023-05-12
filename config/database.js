const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://nick:nick@cluster0.7zlwyir.mongodb.net/hattrickhub?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});



