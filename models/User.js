const { Schema, model } = require("mongoose");

// Schema for User model.
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address."],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual property `friendCount` retrieves length of user's friends array field on query.
userSchema
  .virtual("friendCount")
  // Getter.
  .get(function () {
    return this.friends.length;
  })
  .set(function (v) {
    // Set friends array to value (v).
    this.set({ friends: v });
  });

// Initialize User model.
const User = model("user", userSchema);

module.exports = User;
