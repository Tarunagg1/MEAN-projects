const router = require('express').Router();
const connection = require('../db/conection');
const { authenticationToken } = require('../services/authentication');
const { checkAdminRole } = require('../services/checkRole');
const pdf = require('html-pdf');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const ejs = require('ejs');



router.post('/generateReport', authenticationToken, (req, res) => {
    const generatedId = uuid.v1();
    const { name, email, contact, paymentmethod, productDetails, total } = req.body;
    const productDetailsReport = JSON.parse(productDetails);
    // console.log(req.locals);
    const createdBy = req.locals.email;
    let query = "INSERT INTO `bills`(`uuid`, `name`, `email`, `contact`, `paymentMethod`, `total`, `productsDetails`, `createdBy`) VALUES (?,?,?,?,?,?,?,?)";

    connection.query(query, [generatedId, name, email, contact, paymentmethod, total, productDetails, createdBy], (err, resp) => {
        if (!err) {
            console.log('hehe');
            ejs.renderFile(path.join(__dirname, "", "report.ejs"), { productDetails: productDetailsReport, name, email, ContactNumber: contact, paymentmethod, totalAmount: total }), (err, result) => {
                console.log('jj');
                if (err) {
                    console.log('3');
                    console.log(err);
                    return res.status(500).json({ message: err });
                } else {
                    pdf.create(result).toFile('../generated_pdf/' + generatedId + '.pdf', (err, data) => {
                        if (data) {
                            console.log('2');
                            console.log(err);
                            return res.status(500).json({ message: err });
                        }
                        return res.status(200).json({ message: "Bill genrated successfully", generatedId });
                    })
                }
            };
        } else {
            console.log('1');
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }
    })
})


router.get('/getbils/', authenticationToken, async (req, res) => {
    let query = "SELECT * FROM bills ORDER BY id DESC";
    try {
        connection.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            return res.status(200).json({ message: "bills data", data: results });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})


router.delete('/delete/:id', authenticationToken, checkAdminRole, async (req, res) => {
    const bid = req.params.id;

    let query = "DELETE FROM bills WHERE id=?";

    try {
        connection.query(query, [bid], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "bill not found" });
            } else {
                return res.status(200).json({ message: "bill deleted successfully" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});





module.exports = router;