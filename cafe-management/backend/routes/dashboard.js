const router = require('express').Router();
const connection = require('../db/conection');
const { authenticationToken } = require('../services/authentication');
const { checkAdminRole } = require('../services/checkRole');


router.get('/details', authenticationToken, async (req, res) => {
    let categoryCount = 0;
    let productCount = 0;
    let billCount = 0;

    let query = "SELECT count(id) as categoryCount from categories";
    connection.query(query, (err, results) => {
        if (!err) {
            categoryCount = results[0].categoryCount;
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    });

    query = "SELECT count(id) as productCount from products";
    connection.query(query, (err, results) => {
        if (!err) {
            console.log(results[0].productCount);
            productCount = results[0].productCount;
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    });

    query = "SELECT count(id) as billsCount from bills";
    connection.query(query, (err, results) => {
        if (!err) {
            billCount = results[0].billsCount;
            return res.status(200).json({ message: "All stats", categoryCount, productCount, billCount });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    });

})




module.exports = router;