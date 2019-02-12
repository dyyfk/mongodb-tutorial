const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

 Todo.remove({}).then((result) => {
   console.log(result);
 });



// Todo.findOneAndRemove
// Todo.findByIdAndRemove

 Todo.findOneAndRemove({_id: '5c4a8b754461a27f044ef519'}).then((todo) =>{
	 console.log(todo);
 });

//Todo.findByIdAndRemove('57c4610dbb35fcbf6fda1154').then((todo) => {
//  console.log(todo);
//});