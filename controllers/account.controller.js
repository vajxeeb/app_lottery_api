

const connection = require('../config-db/connection')
const jwt = require('jsonwebtoken')
let account = require('../models/account.model')
let SQL = ``
const logger = require('../config-log/logger')
const process = require('../Processes')
//.............Login......................//
exports.login = async (req, res) => {

    account = req.params

    logger.info(`POST/api/login/${account.device_code}/${account.us_pwd}`)

    SQL = `SELECT * FROM  public.tbl_user_seller WHERE  device_code = $1 AND us_pwd = $2`

    if (!account.device_code || !account.us_pwd) {
        return res.status(400).send({ message: 'Enter your password' })
    }
    await connection.query(SQL, [account.device_code, account.us_pwd], (error, results) => {

        if (error) {
            logger.error(error)
            res.status(403).send({ error: error })
        }
        if (results.rowCount == 0) {

            res.status(404).send({ message: 'password incorrect' })
        }
        else {
            jwt.sign({ account }, 'secretkey', (err, token) => {
                res.json({
                    token,
                    results
                });
            });
        }
    });
}
//.....................PasswordChange..............//
exports.PasswordChage = async (req, res) => {
    account = req.params
    SQL = `UPDATE public.tbl_user_seller SET us_pwd = $1 WHERE device_code = $2 AND us_pwd = $3`
    if (!account.device_code || !account.us_pwd || !account.us_newpwd)
        return res.status(400).send({ message: "Enter device_code Or oldPassword Or newPassword" })
    process.PUT(
        res,
        `POST/api/userpasswordchange/${account.device_code}/${account.us_pwd}/${account.us_newpwd}`,
        SQL,
        [account.us_newpwd, account.device_code, account.us_pwd]
    )
}
