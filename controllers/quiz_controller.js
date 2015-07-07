var models = require('../models/models.js');

<<<<<<< HEAD
// GET quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
  	res.render('quizes/show', {Quiz: quiz});
=======
// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
  	res.render('quizes/question', {pregunta: quiz[0].pregunta});
>>>>>>> 86e45a7de2b8df3490aebbe2e6930e03e648ff78
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
<<<<<<< HEAD
	models.Quiz.find(req.params.quizId).then(function(quiz){
  		if(req.query.respuesta === quiz.respuesta){
    		res.render('quizes/answer', 
    			{Quiz: quiz, respuesta: 'Correcto'});
  		} else {
    		res.render('quizes/answer', 
    			{Quiz: quiz, respuesta: 'Incorrecto'});
=======
	models.Quiz.findAll().then(function(quiz){
  		if(req.query.respuesta === quiz[0].respuesta){
    		res.render('quizes/answer', {respuesta: 'Correcto'});
  		} else {
    		res.render('quizes/answer', {respuesta: 'Incorrecto'});
>>>>>>> 86e45a7de2b8df3490aebbe2e6930e03e648ff78
  		}
  	})
};
