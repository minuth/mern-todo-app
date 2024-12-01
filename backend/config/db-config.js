import mongoose from "mongoose";

export async function initDatabaseConnection() {
  mongoose.set("strictQuery", true);
  mongoose.connect(
    "mongodb://root:123456@localhost:27017/todo-db?authSource=admin"
  );
}
