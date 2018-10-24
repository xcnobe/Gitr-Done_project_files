function getPassword(email) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });

    const sql = util.format('SELECT password AS "em" FROM users WHERE email = %s', email);
    pool.query(sql, (err, res));
    pool.end();
    return res.rows[0].em;
}

function createUser(first, last, email, password) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });

    const sql = util.format('INSERT INTO users(id, firstname, lastname, email, password) VALUES(%d, %s, %s, %s, %s)', 1, first, last, email, password);
    pool.query(sql, (err, res));
    pool.end();
    return;
}

function checkIfUserExists(email) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamegoeshere',
        password: 'passwordgoeshere',
        port: '5432'
    });

    const sql = util.format('SELECT email AS "em" FROM users WHERE email = %s', email);
    pool.query(sql, (err, res));
    pool.end();
    const result = res.rows[0].em;
    if (result == email) {
        return true;
    } else {
        return false;
    }
}
