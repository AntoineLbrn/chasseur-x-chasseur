const Pokedex = require("../component/pokedex.js");

module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Pokedex(cardFoundIds)]});
}