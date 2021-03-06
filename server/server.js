const _ = require('lodash');
var express = require('express');
var {ObjectID} = require('mongodb');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
	var todo = new Todo({
		text: req.body.text,
	});
	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({
			todos
		});
	},(e)=>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req,res)=>{
	var id = req.params.id;
	
	if(!ObjectID.isValid(id)){
		return res.status(404).send('id is not valid');
	}
	Todo.findById(id).then((todo)=>{
		if(!todo){
			res.status(404).send('unable to find the todo by id');
		}
		res.send({
			todo
		});
	}).catch((e)=>{
		res.status(400).send();
	});
	
});

app.delete('/todos/:id',(req,res)=>{
	var id = req.params.id;
	
	if(!ObjectID.isValid(id)){
		return res.status(404).send('id is not valid');
	}
	Todo.findByIdAndRemove(id).then((todo)=>{
		if(!todo){
			res.status(404).send('unable to find the todo by id');
		}
		res.send({
			todo
		});
	}).catch((e)=>{
		res.status(400).send();
	});
});


app.get('/users/me',authenticate,(req,res)=>{
	res.send(req.user);
});

app.post('/users',(req,res)=>{
	var body = _.pick(req.body, ['email','password']);
	var user = new User(body);							 
	
	user.save().then(()=>{
//		res.send(user);	
        return user.generateAuthToken();
	}).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
		res.status(400).send(e);					 
	});
});

app.patch('/todos/:id',(req,res)=>{
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	
	if(!ObjectID.isValid(id)){
		return res.status(404).send('id is not valid');
	}
	
	if(_.isBoolean(body.completed)&&body.completed){
		body.completedAt = new Date().getTime();
	} else{
		body.completed = false;
		body.completedAt = null;
	}
	
	Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
		if(!todo){
			res.status(404).send('unable to find the todo by id');
		}
		res.send({
			todo
		});
	}).catch((e)=>{
		res.status(400).send();	
	});
});

app.listen(PORT,()=>{
	console.log(`Port listening to ${PORT}`);
});


