import Player from '../models/Player.js';

// Get all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new player
export const addPlayer = async (req, res) => {
  const { name, role, startingPrice } = req.body;
  try {
    const newPlayer = new Player({ name, role, startingPrice });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing player
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, role, startingPrice } = req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { name, role, startingPrice },
      { new: true, runValidators: true } // Return the updated document and enforce schema validation
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a player
export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};