const router = require('express').Router();
const connection = require('../db/conection');
const { authenticationToken } = require('../services/authentication');
const { checkAdminRole } = require('../services/checkRole');


router.post('/add', authenticationToken,checkAdminRole, async (req, res) => {
    const { name } = req.body;
    let query = "INSERT INTO categories (name) VALUES(?)";
    try {
        connection.query(query, [name], (err, resp) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "Category created" });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.get('/get', authenticationToken, async (req, res) => {
    const { name } = req.body;
    let query = "SELECT * FROM categories ORDER BY name";
    try {
        connection.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "Category Date", data: results });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.patch('/update', authenticationToken, async (req, res) => {
    const { id, name } = req.body;
    let query = "UPDATE categories SET name=? WHERE id=?";

    try {
        connection.query(query, [name, id], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "Category id not found" });
            } else {
                return res.status(200).json({ message: "Category update successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})





module.exports = router;