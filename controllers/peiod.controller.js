
const connection = require('../config-db/connection')
let SQL = ``
const process = require('../Processes')

exports.getperiod = async (req, res) => {

    const deviceCode = req.params.deviceCode

    SQL = ` SELECT period_number as periodNumber, to_char("date_bill", 'DD/MM/YYYY') as date, sum(bill_price) as totalPrice
                   FROM  tbl_bill WHERE device_code = $1
                         GROUP BY period_number, date_bill`
    process.GET(
        res,
        `GET/api/period/get/${deviceCode}`,
        SQL,
        [deviceCode]
    )
}
