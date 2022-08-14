const router = require('express').Router();
const connection = require('../db/conection');
const jwt = require('jsonwebtoken');
const transporter = require('../lib/mailer');
const { authenticationToken } = require('../services/authentication');
const { checkAdminRole } = require('../services/checkRole');


router.post('/signup', async (req, res) => {
    const { name, email, password, contactNumber } = req.body;
    let query = "SELECT email,password FROM users WHERE email=?";
    try {
        connection.query(query, [email], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.length <= 0) {
                query = "INSERT INTO users (name,email,password,contactNumber,status,role) VALUES(?,?,?,?,'false','user')";

                connection.query(query, [name, email, password, contactNumber], (err, inserteddata) => {
                    if (err) {
                        return res.status(500).json({ message: "Something went wrong" });
                    }
                    return res.status(200).json({ message: "user created successfully", inserteddata });
                });

            } else {
                return res.status(400).json({ message: "user allready exist" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    let query = "SELECT email,password,status,role FROM users WHERE email=?";

    try {
        connection.query(query, [email], (err, resp) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            if (resp.length > 0) {
                // check password
                if (resp[0].password === password) {
                    const payLoad = { email: resp[0].email, role: resp[0].role };
                    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '8h' });

                    return res.status(200).json({ message: "login successfully", token });
                } else if (resp[0].status === 'false') {
                    return res.status(400).json({ message: "Account is not activated" });
                }
                else {
                    return res.status(400).json({ message: "invalid password" });
                }

            } else {
                return res.status(200).json({ message: "user not exists" });
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});


router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    let query = "SELECT email,password,status,role FROM users WHERE email=?";

    connection.query(query, [email], (err, resp) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        if (resp.length <= 0) {
            return res.status(200).json({ message: "password send successfully" });
        } else {
            let mailOptions = {
                from: process.env.EMAIL_HOST,
                to: resp[0].email,
                subject: "Password by cafe management system",
                html: `<p><b>Your login details email: ${resp[0].email} && password: ${resp[0].password}</b></p>`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: "Unable to send password" });
                } else {
                    return res.status(200).json({ message: "password sent successfully" });
                }
            });
        };
    });
});

router.get('/get', authenticationToken, checkAdminRole, async (req, res) => {
    let query = "SELECT id,name,email,contactNumber,status FROM users WHERE role='user'";
    connection.query(query, (err, resp) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" });
        } else {
            return res.status(200).json({ message: "user data", result: resp });
        }
    })
})


router.patch('/update', authenticationToken, checkAdminRole, async (req, res) => {
    let query = "UPDATE users SET status=? WHERE id=?";

    connection.query(query, [user.status, user.id], (err, resp) => {
        if (!err) {
            if (resp.effectedRows == 0) {
                return res.status(404).json({ message: "No user found" });
            }
            return res.status(200).json({ message: "patient updated" });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    })
})


router.get('/checkToken', authenticationToken, async (req, res) => {
    return res.status(200).json({ message: "patient updated" });
});

router.post('/changepassword', authenticationToken, async (req, res) => {
    const email = req.locals.email;
    const { oldpassword, newpassword } = req.body;

    let query = "SELECT * from users WHERE email=? AND passwors=?";
    connection.query(query, [email, oldpassword], (err, resp) => {
        if (!err) {
            if (resp.length <= 0) {
                return res.status(404).json({ message: "incorrect oldpassword" });
            }

            query = "UPDATE users SET password=? WHERE email=?";
            connection.query(query, [newpassword, email], (err, resp) => {
                if (!err) {
                    return res.status(200).json({ message: "password updated successfully" });
                } else {
                    return res.status(500).json({ message: "Something went wrong" });
                }
            })

            return res.status(200).json({ message: "patient updated" });
        } else {
            return res.status(500).json({ message: "Something went wrong" });
        }
    });
});





module.exports = router;