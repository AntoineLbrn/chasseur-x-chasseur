const clientPg = require("./clientPg");

module.exports = async (discordId, cardFound) => {
    const res = await clientPg.query(`INSERT INTO collection VALUES ('${discordId}', ${cardFound});`)
    for (let row of res.rows) console.log(JSON.stringify(row));
}