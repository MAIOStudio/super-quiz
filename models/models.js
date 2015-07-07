var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar el Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{dialect: protocol,
	 protocol: protocol,
	 port: port,
	 host: host,
	 storage: storage, // solo SQLite (.env)
	 omitNull: true	// solo Postgres
	}
);

//Importar la definición de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // Exportar definición de tabla Quiz

// sequielize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count){
		if(count === 0){ // La tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: '¿Capital de Italia?',
						  respuesta: 'Roma'
						});
			Quiz.create({ pregunta: '¿Capital de Portugal?',
						  respuesta: 'Lisboa'
						})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
}) ;