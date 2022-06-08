const Pokedex = require("./pokedex.js");

module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Pokedex(cardFoundIds)]});
}