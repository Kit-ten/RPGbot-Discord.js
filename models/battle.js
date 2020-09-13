const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
  userID: String,
  username: String,
  serverID: String,
  health: { type: Number, default: 100 },
  strength: { type: Number, default: 5 },
  defence: { type: Number, default: 5 },
  xp: { type: Number, default: 0 },
  xpneed: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  class: String,
});

module.exports = mongoose.model('Stats', statsSchema);
