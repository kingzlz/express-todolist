var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

mongoose.connect('mongodb://ziven:zhang1120@ds123718.mlab.com:23718/todos');

var todoSchema = new mongoose.Schema({
  item: String
});
// mongoose 模型
var Todo = mongoose.model('Todo', todoSchema);
/* var tiemOne = Todo({item: 'buy flowers'}).save(function(err) {
    if (err) throw err;
    console.log('item saved');
});

var data = [
  { item: 'get milk' },
  { item: 'walk dog' },
  { item: 'kick some coding ass' }
]; */

module.exports = function(app) {
  app.get('/', function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:id', function(req, res) {
      console.log(req.params.id);
     Todo.find({
       _id: req.params.id
     }).remove(function(err, data) {
       if (err) throw err;
       res.json(data);
     });
  });
};
