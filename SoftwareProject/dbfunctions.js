function getPassword(username) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });

    const sql = util.format('SELECT password AS "pw" FROM users WHERE username = %s', username);
    pool.query(sql, (err, res));
    pool.end();
    return res.rows[0].pw;
}

function createUser(username, password) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamehere',
        password: '123',
        port: '5432'
    });

    const sql = util.format('INSERT INTO users(id, username, password) VALUES(%s, %s)', username, password);
    pool.query(sql, (err, res));
    pool.end();
    return;
}

function checkIfUserExists(username) {
    const pg = require('pg');
    const util = require('util');

    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dbnamegoeshere',
        password: 'passwordgoeshere',
        port: '5432'
    });

    const sql = util.format('SELECT username AS "un" FROM users WHERE username = %s', username);
    pool.query(sql, (err, res));
    pool.end();
    const result = res.rows[0].un;
    if (result == username) {
        return true;
    } else {
        return false;
    }
}