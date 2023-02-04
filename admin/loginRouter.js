const express = require('express');
const bodyParser = require('body-parser');
// const register = require('./userRouter');
// const db = require("./connect_db");
const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended:false}));


// =============== Login Router ===============
const loginRouter = express.Router();

// loginRouter.post('/login', bodyParser.json() , register.checkDataUser)
//
// loginRouter.post('/registration', bodyParser.json() , register.inputDataUser)
// loginRouter.post('/change_main', bodyParser.json() , register.changeDataUser)
// loginRouter.post('/first_child', bodyParser.json() , register.inputFirstChild)
// loginRouter.post('/correct_child', bodyParser.json() , register.correctDataOfChild)
// loginRouter.post('/last_data', bodyParser.json() , register.inputDataLastTime)
// loginRouter.post('/delete_last_input', bodyParser.json() , register.removeDataLastTime)



// loginRouter.post('/users', bodyParser.json(), async function (req, res) {
//     // const dataUser = await db.getDataUser(req.user.login);
//     const pageNumber = (req.body.pageNumber - 1) * req.body.linksPerPage;
//     const linksPerPage = req.body.linksPerPage;
//         let dataAllUser = await db.getAllDataUser(linksPerPage, pageNumber);
//         dataAllUser = JSON.stringify(dataAllUser)
//         res.status(200).send(dataAllUser)
// });
//
// loginRouter.get('/data_now/:login', async function (req, res) {
//     console.log('входящий ID - ' + req.params.login)
//     // res.status(200).send("OK")
//     const dataInput = await db.getDataLastInput(req.params.login);
//     console.log(dataInput)
//     if (dataInput) {
//         res.status(200).send(dataInput)
//     } else {
//         return res.status(403).send(false);
//     }
// });
// loginRouter.get('/one_user/:login', async function (req, res) {
//     // console.log('входящий логин - ' + req.params.login)
//     const dataUser = await db.getDataUser(req.params.login);
//     // console.log(dataUser)
//     if (dataUser) {
//         res.status(200).send(dataUser)
//     } else {
//         return res.status(403).send(false);
//     }
// });
//
// loginRouter.get('/user_childs/:login', async function (req, res) {
//     // console.log('входящий логин - ' + req.params.login)
//     const dataChild = await db.getDataOfChild(req.params.login);
//     const dataInput = await db.getDataLastInput(req.params.login);
//     // console.log(dataUser)
//     if (dataChild) {
//         res.status(200).send({dataChild : dataChild, dataInput: dataInput})
//     } else {
//         return res.status(403).send('false');
//     }
// });
//
// loginRouter.get('/change_access/:login', async function (req, res) {
//         const login = req.params.login;
//         await db.changeAccessUser(login);
//         res.status(200).send(true)
// });


module.exports.loginRouter = loginRouter;