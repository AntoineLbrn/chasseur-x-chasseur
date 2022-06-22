const Collection = require("./collection.js");

module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Collection(cardFoundIds, 0), new Collection(cardFoundIds, 1)]});
}