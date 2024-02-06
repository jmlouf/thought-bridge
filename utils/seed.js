// Import necessary modules and functions
const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUsername, getRandomThoughts } = require("./data");

// Error handling for the database connection
connection.on("error", (err) => err);

// Seed function to run when the connection is established
connection.once("open", async () => {
  console.log("connected");

  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  // Arrays to hold users and thoughts data
  const users = [];
  const thoughts = getRandomThoughts(10);

  // Create users
  for (let i = 0; i < 10; i++) {
    const userId = getRandomUsername();
    const userEmail = `${userId}@email.com`;
    const userThoughts = [];

    users.push({
      username: userId,
      email: userEmail,
      thoughts: userThoughts,
    });
  }

  // Insert users into the database.
  const insertedUsers = await User.collection.insertMany(users);
  const insertedUserIds = insertedUsers.insertedIds;

  for (let userId of Object.values(insertedUserIds)) {
    const user = await User.findOne({ _id: userId });
    // Random number of friends.
    const numOfFriends = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    // Randomized friends.
    const friendIds = Object.values(insertedUserIds)
      .filter((id) => id !== userId)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOfFriends);
    // Update user friends.
    await User.updateOne({ _id: userId }, { $set: { friends: friendIds } });
  }

  // Insert thoughts into the database
  const insertedThoughts = await Thought.collection.insertMany(thoughts);
  const insertedThoughtIds = insertedThoughts.insertedIds;

  // Loop through each thought and associate it with a random user
  for (let thoughtId of Object.values(insertedThoughtIds)) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];

    // Update the thought document to include the associated username
    await Thought.updateOne(
      { _id: thoughtId },
      { $set: { username: randomUser.username } }
    );

    // Add the thought ID to the user's thoughts array
    randomUser.thoughts.push(thoughtId);
  }

  // Update the users in the database with associated thoughts
  for (let user of users) {
    await User.updateOne(
      { _id: user._id },
      { $set: { thoughts: user.thoughts } }
    );
  }

  // Logging and exit
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
