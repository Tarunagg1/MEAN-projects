const router = require('express').Router();
const connection = require('../db/conection');
const { authenticationToken } = require('../services/authentication');
const { checkAdminRole } = require('../services/checkRole');


router.post('/add', authenticationToken, async (req, res) => {
    const { name, categoryid, price, description } = req.body;
    let query = "INSERT INTO `products`(`name`, `categoryid`,`price`, `description`, `status`) VALUES (?,?,?,?,'true')";
    try {
        connection.query(query, [name, categoryid, price, description], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "Product created successfully" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.get('/get', authenticationToken, async (req, res) => {
    let query = "SELECT p.id,p.name,p.price,p.description,p.status,c.id as categoryId ,c.name as categoryName FROM products as p INNER JOIN categories as c  WHERE p.categoryid = c.id";
    try {
        connection.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "products Data", data: results });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.get('/category/:id', authenticationToken, async (req, res) => {
    const id = req.params.id;
    let query = "SELECT id,name FROM products WHERE categoryid=? AND status='true'";
    try {
        connection.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "products data", data: results });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.get('/getById/:id', authenticationToken, async (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM products WHERE id=? AND status='true'";
    try {
        connection.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "products data", data: results[0] });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.patch('/update', authenticationToken, async (req, res) => {
    const { pid, name, categoryid, price, description } = req.body;

    let query = "UPDATE `products` SET `name`=?,`categoryid`=?,`price`=?,`description`=? WHERE `id`=?";

    try {
        connection.query(query, [name, categoryid, price, description, pid], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "product not found" });
            } else {
                return res.status(200).json({ message: "product update successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.delete('/delete/:id', authenticationToken, checkAdminRole, async (req, res) => {
    const pid = req.params.id;

    let query = "DELETE FROM products WHERE id=?";

    try {
        connection.query(query, [pid], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "product not found" });
            } else {
                return res.status(200).json({ message: "product deleted successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})



router.patch('/updatestatus', authenticationToken, async (req, res) => {
    const { pid, status } = req.body;

    let query = "UPDATE `products` SET `status`=? WHERE `id`=?";

    try {
        connection.query(query, [status, pid], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "product not found" });
            } else {
                return res.status(200).json({ message: "product status update successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})



module.exports = router;