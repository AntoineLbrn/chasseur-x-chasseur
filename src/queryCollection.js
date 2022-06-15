const clientPg = require("./clientPg");

module.exports = async (discordId, clientPg) => {
    try {
        const res = await clientPg.query(`SELECT card_number FROM collection WHERE "user_id"='${discordId}';`)
        //clientPg.connect();
        // await clientPg.query(`SELECT * FROM collection WHERE "user_id"='${discordId}';`, (error, res) => {
        //     if (error) console.log("Erreur query : " + error.message);
        //     else {
        //         console.log(res.rows)
        //         // console.log(res.rows[0])
        //         // console.log(res.rows[0].user_id)
        //         //clientPg.end();
        //         return res.rows;
        //     }
        //     });
        return res;  
    } catch (error) {
        console.log("Something unexpected happened : " + error)
    }
}