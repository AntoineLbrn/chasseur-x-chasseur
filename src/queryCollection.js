const clientPg = require("./clientPg");

module.exports = async (discordId, clientPg) => {
    try {
        const res = await clientPg.query(`SELECT card_number FROM collection WHERE "user_id"='${discordId}';`)
        return res.rows;
    } catch (error) {
        console.log("Something unexpected happened : " + error)
    }
}