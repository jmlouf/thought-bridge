const Thought = require("../models/Thought");

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
      const thought = await Thought.create(req.body);

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
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
      const deletedThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      res.json({ message: "Thought deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const addedReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!addedReaction) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      res.json(addedReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const removedReaction = await Thought.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );

      if (!removedReaction) {
        return res.status(404).json({ message: "No thought with this id." });
      }

      res.json(removedReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
