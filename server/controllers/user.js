'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

// Métodos de prueba
function pruebas(req, res) {
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Registro
function saveUser(req, res) {
	var params = req.body;
	var user = new User();

	if (params.name && params.surname && params.email && params.password) {

		user.name = params.name;
		user.surname = params.surname;
		user.email = params.email;

		// Controlar usuarios duplicados
		User.find({
			$or: [
				{ email: user.email.toLowerCase() },
			]
		}).exec((err, users) => {
			if (err) return res.status(200).send({ msg: 'Error en la petición de usuarios' });

			if (users && users.length >= 1) {
				return res.status(200).send({ msg: 'El usuario que intentas registrar ya existe!!' });
			} else {

				// Cifra la password y me guarda los datos 
				bcrypt.hash(params.password, null, null, (err, hash) => {
					user.password = hash;

					user.save((err, userStored) => {
						if (err) return res.status(500).send({ msg: 'Error al guardar el usuario' });

						if (userStored) {
							res.status(200).send({ user: userStored, msg:'success' });
						} else {
							res.status(404).send({ msg: 'No se ha registrado el usuario' });
						}

					});
				});

			}
		});

	} else {
		res.status(200).send({
			msg: 'faild'
		});
	}
}

// Login
async function login(req, res) {
	var {email, password} = req.body;

	await User.findOne({ email: email }, (err, user) => {
		if (err) {
			res.status(400).send({
				msg: 'Error'
			})
		}
		if (user) {
			bcrypt.compare(password, user.password, (err, check) => {
				if (check) {
					const token = jwt.sign({ user }, 'clave_super_secreta');
					res.status(200).send({
						msg: 'success',
						id: user._id,
						name: user.name,
						surname: user.surname,
						token
					})
				}else{
					res.status(200).send({
						msg: 'faild'
					})
				}
			});
			//console.log(user);
		}
	});
}

// Edición de datos de usuario
async function updateUser(req, res) {
	var userId = req.params.id;
	var update = req.body;

	// borrar propiedad password
	delete update.password;

	if (userId != req.user.sub) {
		return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario' });
	}

	await User.find({
		$or: [
			{ email: update.email.toLowerCase() },
			{ nick: update.nick.toLowerCase() }
		]
	}).exec((err, users) => {

		var user_isset = false;
		users.forEach((user) => {
			if (user && user._id != userId) user_isset = true;
		});

		if (user_isset) return res.status(404).send({ message: 'Los datos ya están en uso' });

		User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
			if (err) return res.status(500).send({ message: 'Error en la petición' });

			if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

			return res.status(200).send({ user: userUpdated });
		});

	});

}

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser,
}
