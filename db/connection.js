const mongoose = require("mongoose");
MONGODB_CONNECT_URL ="mongodb+srv://agencyapps:Amit12345Mandal@cluster0.nqes8i2.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(MONGODB_CONNECT_URL)
  .then(() => console.log("Connect db"))
  .catch((e) => console.log("Error", e));
