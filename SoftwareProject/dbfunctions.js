function getPassword(email) {
    const pg{ Client } = require('pg');
    const util = require('util');

    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    })
    
    const sql = util.format('SELECT password AS "em" FROM users WHERE email = %s', email);
    client.query(sql, (err, res))=> {
        if (err) throw err
        console.log(res)
        client.end()
    })
    return res.rows[0].em;
}

function createUser(first, last, email, password) {
    const pg{ Client } = require('pg');
    const util = require('util');

    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    })

    const sql = util.format('INSERT INTO users(id, firstname, lastname, email, password) VALUES(%d, %s, %s, %s, %s)', 1, first, last, email, password);
    client.query(sql, (err, res))=> {
        if (err) throw err
        console.log(res)
        client.end()
    })
    return;
}

function checkIfUserExists(email) {
    const pg{ Client } = require('pg');
    const util = require('util');

    const client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    })

    const sql = util.format('SELECT email AS "em" FROM users WHERE email = %s', email);
    client.query(sql, (err, res))=> {
        if (err) throw err
        console.log(res)
        client.end()
    })
    const result = res.rows[0].em;
    if (result == email) {
        return true;
    } else {
        return false;
    }
}
