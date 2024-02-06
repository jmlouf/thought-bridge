const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema for Thought model.
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  // User ID of the user that created the thought.
  username: {
    type: String,
    required: true,
  },
  // (These are like replies).
  reactions: [Reaction],
});

// Virtual property `reactionCount` retrieves length of thought's reactions array field on query.
thoughtSchema
  .virtual("reactionCount")
  // Getter.
  .get(function () {
    return this.reactions.length;
  });

// Format date.
function dateFormat(createdAt) {
  // TBD.
}

// Initialize Thought model.
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
