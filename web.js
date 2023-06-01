const fs = require('fs')
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const db = require('./config/db')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const https = require('https')
const port = 8001;
app.use(cors());
const http = require('http')
require('dotenv').config()
const im = require('imagemagick');
const sharp = require('sharp')
//passport, jwt
const jwt = require('jsonwebtoken')
const { checkLevel, logRequestResponse, isNotNullOrUndefined, namingImagesPath, nullResponse, lowLevelResponse, response, returnMoment, sendAlarm, categoryToNumber, tooMuchRequest } = require('./util')
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
const ejs = require('ejs');
//multer
const { upload } = require('./config/multerConfig')
//express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// passportConfig(passport);
const schedule = require('node-schedule');

const path = require('path');
const { insertQuery } = require('./query-util')
const { getItem } = require('./routes/api')
app.set('/routes', __dirname + '/routes');
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/config', express.static(__dirname + '/config'));
//app.use('/image', express.static('./upload'));
app.use('/image', express.static(__dirname + '/image'));
app.use('/api', require('./routes/router'))

app.get('/', (req, res) => {
        console.log("back-end initialized")
        res.send('back-end initialized')
});
const is_test = true;
app.connectionsN = 0;
const HTTP_PORT = 8001;
const HTTPS_PORT = 8443;


const dbQueryList = (sql, list) => {
        return new Promise((resolve, reject) => {
                db.query(sql, list, (err, result, fields) => {
                        if (err) {
                                console.log(sql)
                                console.log(err)
                                reject({
                                        code: -200,
                                        result: result
                                })
                        }
                        else {
                                resolve({
                                        code: 200,
                                        result: result
                                })
                        }
                })
        })
}

let time = new Date(returnMoment()).getTime();
let overFiveTime = new Date(returnMoment());
overFiveTime.setMinutes(overFiveTime.getMinutes() + 5)
overFiveTime = overFiveTime.getTime();

let server = undefined
if (is_test) {
        server = http.createServer(app).listen(HTTP_PORT, function () {
                console.log("Server on " + HTTP_PORT)
        });

} else {
        const options = { // letsencrypt로 받은 인증서 경로를 입력해 줍니다.
                ca: fs.readFileSync("/etc/letsencrypt/live/mago1004.com/fullchain.pem"),
                key: fs.readFileSync("/etc/letsencrypt/live/mago1004.com/privkey.pem"),
                cert: fs.readFileSync("/etc/letsencrypt/live/mago1004.com/cert.pem")
        };
        server = https.createServer(options, app).listen(HTTPS_PORT, function () {
                console.log("Server on " + HTTPS_PORT);
        });

}
server.on('connection', function (socket) {
        // Increase connections count on newly estabilished connection
        app.connectionsN++;

        socket.on('close', function () {
                // Decrease connections count on closing the connection
                app.connectionsN--;
        });
});

const resizeFile = async (path, filename) => {
        try {
                // await sharp(path + '/' + filename)
                //         .resize(64, 64)
                //         .jpeg({quality:100})
                //         .toFile(path + '/' + filename.substring(3, filename.length))
                //        await fs.unlink(path + '/' + filename, (err) => {  // 원본파일 삭제 
                //                 if (err) {
                //                     console.log(err)
                //                     return
                //                 }
                //             })
                fs.rename(path + '/' + filename, path + '/' + filename.replaceAll('!@#', ''), function (err) {
                        if (err) throw err;
                        console.log('File Renamed!');
                });
        } catch (err) {
                console.log(err)
        }
}
// fs.readdir('./image/profile', async (err, filelist) => {
//         if (err) {
//                 console.log(err);
//         } else {
//                 for (var i = 0; i < filelist.length; i++) {
//                         if (filelist[i].includes('!@#')) {
//                                 await resizeFile('./image/profile', filelist[i]);
//                         }
//                 }
//         }
// });

// Default route for server status

app.get('/api/item', async (req, res) => {
        try {
                // if (tooMuchRequest(app.connectionsN)) {
                //          return response(req, res, -120, "접속자 수가 너무많아 지연되고있습니다.(잠시후 다시 시도 부탁드립니다.)", [])
                //  }
                let table = req.query.table ?? "user";
                //console.log(table)
                const pk = req.query.pk ?? 0;
                const permission_list = ['setting', 'notice', 'master', 'academy_category', 'review'];
                let whereStr = " WHERE pk=? ";
                const decode = checkLevel(req.cookies.token, 0)
                if ((!decode || decode?.user_level == -10) && !permission_list.includes(table)) {
                        return response(req, res, -150, "권한이 없습니다.", []);
                }
                if (table == 'master') {
                        table = 'user';
                }
                if (table == "setting") {
                        whereStr = "";
                }

                let sql = `SELECT * FROM ${table}_table ` + whereStr;

                if (req.query.views) {
                        db.query(`UPDATE ${table}_table SET views=views+1 WHERE pk=?`, [pk], (err, result_view) => {
                                if (err) {
                                        console.log(err)
                                        return response(req, res, -200, "서버 에러 발생", []);
                                }
                        })
                }
                db.query(sql, [pk], async (err, result) => {
                        if (err) {
                                console.log(err)
                                return response(req, res, -200, "서버 에러 발생s", []);
                        } else {
                                console.log(req.body)

                                if (table == 'academy' && decode?.user_level <= 0 && req.query.views) {
                                        let is_exist = await dbQueryList(`SELECT * FROM subscribe_table WHERE user_pk=${decode?.pk} AND use_status=1 AND transaction_status >= 0 AND academy_category_pk=${result[0]?.category_pk} AND end_date>=? ORDER BY pk DESC`, [returnMoment().substring(0, 10)]);
                                        console.log(is_exist)
                                        is_exist = is_exist?.result;
                                        if (is_exist.length > 0) {
                                        } else {
                                                if (decode?.user_level < 40) {
                                                        return response(req, res, -150, "권한이 없습니다.", [])
                                                }
                                        }
                                        let is_period = await dbQueryList(`SELECT * FROM academy_category_table WHERE pk=? AND (start_date <='${returnMoment().substring(0, 10)}' AND end_date>='${returnMoment().substring(0, 10)}') `, [result[0]?.category_pk])
                                        is_period = is_period?.result;
                                        if (is_period.length > 0) {
                                        } else {
                                                if (decode?.user_level < 40) {
                                                        return response(req, res, -150, "수강 기간이 아닙니다.", [])
                                                }
                                        }
                                }
                                return response(req, res, 100, "success", result[0]);
                        }
                })

        }
        catch (err) {
                console.log(err)
                return response(req, res, -200, "서버 에러 발생", []);
        }
});
// app.get('/shop', async (req, res) => {
//         let { pk, name, review_page, event_page } = req.query;
//         if (name) {
//                 let shop = await dbQueryList(`SELECT * FROM shop_table WHERE name='${name}'`);
//                 shop = shop?.result[0];
//                 res.render('shop.ejs', { 
//                         name: shop?.name,
//                         og_image:shop?.img_src
//                  });
//         }

// })
app.get('/', (req, res) => {
        res.json({ message: `Server is running on port ${!is_test ? HTTPS_PORT : HTTP_PORT}` });
});