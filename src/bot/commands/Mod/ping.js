const { Command } = require("@botbind/klasa");

module.exports = class extends Command {
  run(msg) {
    return msg.send("Pong!");
  }
};