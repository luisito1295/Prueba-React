'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

exports.createToken = function(){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix
	};

	return jwt.encode(payload, secret);
};