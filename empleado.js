const express = require('express');
const empleado = express.Router();
const db = require('./Config/database');

// Crear empleado
empleado.post('/', async (req, res) => {
    const { nombre, apellidos, telefono, correo_electronico, direccion } = req.body;

    if (nombre && apellidos && telefono && correo_electronico && direccion) {
        let query = `INSERT INTO t_empleados (nombre, apellidos, telefono, correo_electronico, direccion)
                     VALUES (?, ?, ?, ?, ?)`;
        const rows = await db.query(query, [nombre, apellidos, telefono, correo_electronico, direccion]);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: 'Nuevo Registro de Empleado Exitoso' });
        }
        return res.status(500).json({ code: 500, message: 'Registro de Empleado Fallido' });
    }
    return res.status(400).json({ code: 400, message: 'Rellena todos los campos' });
});

// Eliminar empleado
empleado.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) return res.status(400).json({ code: 400, message: 'ID inválido' });

    const query = `DELETE FROM empleados WHERE id_empleado = ?`;
    const rows = await db.query(query, [id]);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: 'Empleado eliminado correctamente' });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

// Modificar todo el empleado
empleado.put('/:id', async (req, res) => {
    const id_empleado = req.params.id_empleado;
    const { nombre, apellidos, telefono, correo_electronico, direccion } = req.body;

    if (nombre && apellidos && telefono && correo && direccion) {
        let query = `UPDATE empleados SET nombre=?, apellidos=?, telefono=?, correo_electronico=?, direccion=? WHERE id_empleado=?`;
        const rows = await db.query(query, [nombre, apellidos, telefono, correo_electronico, direccion, id_empleado]);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: 'Empleado actualizado' });
        }
        return res.status(500).json({ code: 500, message: 'Fallo al actualizar' });
    }
    return res.status(400).json({ code: 400, message: 'Campos incompletos' });
});

// Modificar solo nombre
empleado.patch('/:id', async (req, res) => {
    const id = req.params.id;
    if (!req.body.nombre) return res.status(400).json({ code: 400, message: 'Falta nombre' });

    const query = `UPDATE empleados SET nombre=? WHERE nEmpleadoID=?`;
    const rows = await db.query(query, [req.body.nombre, id]);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: 'Nombre actualizado' });
    }
    return res.status(500).json({ code: 500, message: 'Error al actualizar' });
});

// Obtener todos
empleado.get('/', async (req, res) => {
    const emp = await db.query('SELECT * FROM empleados');
    return res.status(200).json({ code: 200, message: emp });
});

// Obtener por ID
empleado.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    const emp = await db.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);

    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

// Obtener por nombre
empleado.get('/nombre/:name', async (req, res) => {
    const name = req.params.name;
    const emp = await db.query('SELECT * FROM empleados WHERE UPPER(nombre) = UPPER(?)', [name]);

    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: 'Empleado no encontrado' });
});

module.exports = empleado;