import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  title: String,
  description: String,
  items: Array,
  font: String,
  fontColor: String,
  background: String,
});

export default mongoose.model("menu", menuSchema);
