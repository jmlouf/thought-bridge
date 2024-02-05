const { Schema, model } = require("mongoose");

// Schema for Reaction subdocument.
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

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
  // (User that created thought).
  username: {
    type: String,
    required: true,
  },
  // (These are like replies).
  reactions: [reactionSchema],
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
const Thought = model("thought", thoughtSchema);

module.exports = { Thought, reactionSchema };
