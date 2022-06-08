const Card = require("../component/card.js");

module.exports = (interface, card) => {
    interface.send({embeds: [new Card(card)]});
}
new Card