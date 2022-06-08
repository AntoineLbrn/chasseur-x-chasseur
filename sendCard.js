const Card = require("./card.js");

module.exports = (interface, card) => {
    interface.send({embeds: [new Card(card)]});
}