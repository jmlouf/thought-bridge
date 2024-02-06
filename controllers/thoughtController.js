const { Thought, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const { thoughtText, userId } = req.body;

      // Retrieve the username from the user object or request body
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create the thought with the username of the user
      const thought = await Thought.create({
        thoughtText,
        username: user.username,
      });

      // Add the thought ID to the user's thoughts array
      user.thoughts.push(thought._id);
      await user.save();

      res
        .status(201)
        .json({ message: "Thought successfully created", thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id." });
      }

      res.json({ message: "Thought successfully deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;

      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      const newReaction = {
        reactionBody,
        username,
      };

      thought.reactions.push(newReaction);

      const savedThought = await thought.save();

      res.json(savedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      thought.reactions.pull({ _id: reactionId });

      const updatedThought = await thought.save();

      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
