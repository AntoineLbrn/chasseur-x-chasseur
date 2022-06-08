const Card = require('../component/card');


module.exports = (interface, card) => {
    interface.send({embeds: [new Card(card)]});
}