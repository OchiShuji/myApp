const express = require('express');
const app = express();
const fs = require('fs');

const process = require('process');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'mysql',
    user:process.env.MYSQL_USER,
    port:process.env.PORT,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
    if (error) {
        // エラーメッセージをコンソールに表示
        console.error(error);

        // エラーをログファイルに書き込む
        fs.appendFile('log/error.log', `${new Date().toISOString()}: ${error}\n`, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });

        //return;
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
        'SELECT * FROM items;',
        (error, results) => {
            if (error) {
                // エラーメッセージをコンソールに表示
                console.error(error);
    
                // エラーをログファイルに書き込む
                fs.appendFile('log/error.log', `${new Date().toISOString()}: ${error}\n`, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
    
                //return;
            }
            res.render('index.ejs', { items: results });
        }
    );
});

app.get('/error', (req,res) => {
    res.render('error.ejs');
});

app.get('/new', (req,res) => {
    res.render('new.ejs');
});

app.get('/edit/:id', (req,res) => {
    res.render('edit.ejs', { commitid: id });
});


app.post('/create', (req,res) => {
    connection.query(
        'INSERT INTO items(name) VALUES (?)',
        [req.body.itemName],
        (error,results) => {
            if (error) {
                // エラーメッセージをコンソールに表示
                console.error(error);
    
                // エラーをログファイルに書き込む
                fs.appendFile('error.log', `${new Date().toISOString()}: ${error}\n`, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
    
                //return;
            }
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

app.post('/commit/:id', (req,res) => {
    connection.query(
        'UPDATE items SET name',
        [req.params.id],
        (error,results) => {
            res.redirect('/edit');
        }
    );
});


port = 3000;
app.listen(port, ()=>{
    console.log('listen:' + port);
});
