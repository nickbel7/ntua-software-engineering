const express = require('express');
const fs = require('fs');
const { dbconnect } = require('/home/konsi/Desktop/api/connect.js');
const router = express.Router();

var sql = fs.readFileSync('tags.sql').toString();

router.post('/', (req,res) => {
        (async () => {
                const client = await dbconnect();
                await client.query("TRUNCATE TABLE tags CASCADE", (err1) => {
                        if (err1 == undefined) {
                                client.query(sql, (err2) => {
                                if (err2 == undefined) {
                                        res.json({status:"OK"});
                                        console.log("table tags(vehicles) reset");
                                }
                                else {
                                        res.json({status:"failed"}).send(err2);
                                        console.log("table tags(vehicles) truncated", err2);
                                }
                                });
                        }
                        else {
                                res.json({status:"failed"}).send(err1);
                                console.log("table tags(vehicles) not truncated", err1);
                        }
                });
        })();
});

module.exports = router;
