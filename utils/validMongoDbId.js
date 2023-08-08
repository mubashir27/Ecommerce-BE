const mongoose = require("mongoose"); // Erase if already required
const validMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid ID");
};
module.exports = validMongoDbId;
