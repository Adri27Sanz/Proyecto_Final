const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('./Config/database');

user.post('/login', async(req, res, next) =>{
    const {admin_correo, admin_contrasena} = req.body
    const query = `SELECT * FROM administradores WHERE correo_electronico ='${admin_correo}' AND contrasena ='${admin_contrasena}';`;
    const rows = await db.query(query);

    if(admin_correo && admin_contrasena){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, 'debugkey');
            return res.status(200).json({code: 200, message: token });
        }
        else{
            return res.status(200).json({code: 401, message: 'Usuario y/o Contraseña incorrectas'});
        }
    }
    return res.status(500).json({code: 500, message: 'Campos incompletos'});
});

user.get('/', async (req, res, next) =>{
    const query = 'SELECT * FROM administradores';
    const rows = await db.query(query);

    return res.status(200).json({code:200, message: rows});
});

module.exports = user;