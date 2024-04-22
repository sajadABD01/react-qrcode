//استيراد البكجات والمكاتب للتعامل مع  قاعده البيانات وطلبات السيرفر
var mysql = require('mysql')
var express = require('express')
var cors = require('cors')
var qrcode = require('qrcode')
var path = require('path')
const { json } = require('body-parser')
require('dotenv').config()
var app = express()

//للتعامل مع تشفير طلبات الرابط 
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname , 'public')))

//  تجهيز الاتصال بقاعده البيانات ومن ثم الاتصال عن طريق المعلومات من ملف environment (.env)
var conn = mysql.createConnection({
    host: process.env.DB_HOST || 'sql6.freemysqlhosting.net',
    user: process.env.DB_USER || 'sql6701087',
    password: process.env.DB_PASS || 'KWFwHucYpI',
    database: process.env.DB_NAME || 'sql6701087'
})
conn.connect((err) => {
    if(err) throw err
    else{
        console.log(conn.state)
    }
    
})

// دالة استيراد البيانات من قاعدة البينات حسب الايدي اذا جاء طلب للسيرفر
app.get('/students/:id', (req, res) => {
    const USER_ID = req.params.id
    const sqlQuery = 'SELECT * FROM information_student WHERE id=?'
    conn.query(sqlQuery, [USER_ID], (err, data) => {
        if (err) throw err
        else
        {
            if(data[0] == undefined)
            {
                console.log('user not exist')
                return res.status(404).send("this user is not exist")
            }
            else
            {
                console.log('user is exist')
                return res.status(200).send(JSON.stringify(data))
            }
        }
    })
})



// دالة استيراد جميع البيانات من قاعدة البينات اذا جاء طلب للسيرفر
app.get('/students', (req, res) => {
    const sqlQueryAll = 'SELECT * FROM information_student'
    conn.query(sqlQueryAll, (err, data) => {
        if (err) throw err
        return res.send(JSON.stringify(data))
    })
})

app.post('/add', (req, res) => {
    //التاكد من ان الايميل غير مستخدم
    conn.query('SELECT COUNT(*) As cnt FROM information_student WHERE email = ?'
        , req.body.email, (err, result) => {
            if (err) throw err
            else {
                if (result[0].cnt >= 1) {
                    res.status(409).send('email is exist')
                    console.log('email is exist')
                } else {

                    if (req.body.average >= 50) {
                        req.body.eligible = 'Yes'
                    } else (
                        req.body.eligible = 'No'
                    )

                    const reqBody = req.body
                    const userEmail = req.body.email

                    conn.query('INSERT INTO information_student SET ?', reqBody, function (err, result) {
                        if (err) throw err
                        console.log('student added')
                    })

                    conn.query('SELECT * FROM information_student WHERE email=?', userEmail, (err, result) => {
                        if (err) throw err
                        else {
                            console.log('get student infromation by email')

                            const data = JSON.stringify(result)
                            const jsonData = JSON.parse(data)
                            const userID = jsonData[0].id
                            const urlId = process.env.FRONTEND_URL + userID || 'http://localhost:3000/students/' + userID
                            const qrcodeFileName = jsonData[0].name + Date.now()+ '.png'
                            const imagesPath = __dirname + '/public/images/'

                            qrcode.toFile(imagesPath + qrcodeFileName, urlId, (err, code) => {
                                if (err) console.log(err)
                            })

                            conn.query('UPDATE information_student SET photoUrl=? WHERE id=?', [qrcodeFileName, userID],
                                (err, result) => {
                                    if (err) throw err
                                    else
                                    {
                                        res.status(200).send(qrcodeFileName)
                                    }
                                })
                            /*conn.query('SELECT * FROM information_student WHERE id=?' , [userID] , (err ,data)=>{
                                if(err) throw err
                                const mysqlData = JSON.stringify(data)
                                const userData = JSON.parse(mysqlData)
                                res.status(200).send(userData[0].photoUrl)
                            })   */ 
                        }
                    })

                }
            }
        })
})

// استماع السيرفر على بورت معين 
app.listen(process.env.PORT || 5000, () => {// 
    console.log('Listening on : ' + process.env.PORT)
})
