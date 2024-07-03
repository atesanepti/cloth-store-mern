require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.SERVER_PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Data base was connected`);
  } catch (error) {
    console.log("Dev Error : ", error.message);
  }
};

app.listen(PORT, async (error) => {
  if (!error) {
    console.log(`server is running at http://localhost:${PORT}`);
    await connectDB();
  } else {
    console.log("Dev Error", error.message);
  }
});
