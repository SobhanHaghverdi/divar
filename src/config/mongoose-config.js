import mongoose from "mongoose";

async function configureMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected successfully ...");
  } catch (error) {
    console.log(error?.message ?? "Mongodb connection failed");
    process.exit(1);
  }
}

export default configureMongoose;
