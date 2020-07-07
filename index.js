const mongoose = require("mongoose");
const {
  IP_SERVER,
  PORT_DB,
  DB_NAME,
  PORT_SERVER,
  API_VERSION,
} = require("./config");

const app = require("./app");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      throw error;
    } else {
      console.log("DB connection success");
      app.listen(PORT_SERVER, () => {
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
      });
    }
  }
);
