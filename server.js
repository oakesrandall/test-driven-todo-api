// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/');


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */
var arrayLength = 3;

app.get('/api/todos/search', function search(req, res) {
  let searchQuery = req.query.q; 
//   let foundIt = todos.filter(function(todo){
//     if (todo.task.toLowerCase().includes(searchQuery.toLowerCase())) {
//       return todo;
//     }
//   });
//   res.send(foundIt);
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var newTodo = {'_id': arrayLength + 1, 'task': req.body.task, 'description': req.body.description};
  arrayLength ++;
  res.json(newTodo);  
});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id == id) {
      res.json(todos[i]);
    }
  }
});

app.put('/api/todos/:id', function update(req, res) {
  var id = req.params.id;
  todos.forEach(function(item) {
    if (item._id == id) {
      var updateTodo = item;
      updateTodo.task = req.body.task;
      updateTodo.description = req.body.description;
      res.json(updateTodo);
    }
  });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = req.params.id;
  var deleteMeId;
  todos.forEach(function(item, index) {
    if (item._id == id) {
      deleteMeId = index;
    }
  });
  res.json({todos: todos});
  todos.splice(deleteMeId, 1);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
