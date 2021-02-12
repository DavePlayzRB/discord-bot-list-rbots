require("module-alias/register");
const mongoose = require("mongoose");

const bot = require('@bot/index');
const App = require('@structures/app.js');
const { web: {port}, discord_client: {token}, mongo_url } = require("@root/config.json");
const express = require('express');
const app = express();


(async () => {
    await mongoose.connect(`${mongo_url}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`Connected to the database on`,`\x1b[34m\x1b[4m${mongo_url}\x1b[0m`);
    let client = await bot.init(token);
    console.log(`Logged in as ` + `\x1b[34m\x1b[4m${client.user.tag}\x1b[0m`);
    await new App(client).listen(port || 8080);
    console.log(`Running on port ` + `\x1b[34m\x1b[4m${port || 80}\x1b[0m`);
})()



app.set('trust proxy', true); // <- required
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

// rest of this is just a demo
app.use((req, res, next) => {
  res.send(`HTTPS: ${req.secure}`); 
  next();
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Demo app listening on ' + listener.address().port);
});
