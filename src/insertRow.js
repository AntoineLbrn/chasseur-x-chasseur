const clientPg = require("./clientPg");

module.exports = (discordId, cardFound) => {
    try {
        clientPg.connect();
        clientPg.query(`INSERT INTO collection VALUES ('${discordId}', ${cardFound})`, (error, res) => {
            if (error) console.log("Could not insert in collection table : " + error.message);
            else 
                for (let row of res.rows) console.log(JSON.stringify(row));
            clientPg.end();
            });    
    } catch (error) {
        console.log("Something unexpected happened : " + error)
    }
    
}