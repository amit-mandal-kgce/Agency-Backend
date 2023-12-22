const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://agencyapps:Amit12345Mandal@cluster0.nqes8i2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connect db"))
  .catch((e) => console.log("Error", e));
