const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

var id = '5c4930f0b90e71165c9f0e89';

if(!ObjectID.isValid(id)){
	return console.log('ID not valid');
}


//User.findById(id).then((user)=>{
//	if(!user){
//		return console.log('id not found');
//	}
//	console.log('User by id', user);
//}).catch((e)=>console.log(e));

Todo.find({
	_id: id
}).then((todos)=>{
	console.log('Todos', todos);
});

Todo.findOne({
	completed: false
}).then((todo)=>{
	console.log('Todo',todo);
});

//Todo.findById(id).then((todo)=>{
//	if(!todo)
//		return console.log('id not found');
//	console.log('Todo by id',todo);
//}).catch((e)=> console.log(e));