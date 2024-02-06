const User = require("../models/User");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate(
        "friends"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      if (req.body.friends) {
        const friendUsers = await User.find({
          _id: { $in: req.body.friends },
        });

        // Add friend users to user's friends array
        user.friends = friendUsers.map((friend) => friend._id);

        // Save updated user
        await user.save();
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json({ message: "User deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const removeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!removeFriend) {
        return res.status(404).json({ message: "No user with this id." });
      }

      res.json(removeFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
