const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'myapp'
});


connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });



app.use(express.static('public'));
app.get('/', (req,res) => {
    res.render('top.ejs');
});

app.use(express.urlencoded({extended: false}));


app.get('/index', (req,res) => {
    connection.query(
        'SELECT * FROM items',
        (error,results) => {
            res.render('index.ejs',{items:results});
        }
    );
});

app.get('/new', (req,res) => {
    res.render('new.ejs');
});

app.get('/edit/:id', (req,res) => {
    res.render('edit.ejs');
});

app.post('/create', (req,res) => {
    connection.query(
        'INSERT INTO items(name) VALUES (?)',
        [req.body.itemName],
        (error,results) => {
            res.redirect('/index');
        }
    );
});

app.post('/delete/:id', (req,res) => {
    connection.query(
        'DELETE FROM items WHERE id=?',
        [req.params.id],
        (error,results) => {
            res.redirect('/index');
        }
    );
});

port = 3000;
app.listen(port, ()=>{
    console.log('listen:' + port);
});
