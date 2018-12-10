const pg = require('pg');

(function() {
    const db = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        database: 'boardrpg'
    });

    db.connect((err) => {
        if (err) {
            console.error('Connection error', err.stack)
        } else {
            console.log('Connected')
        }
    });

    module.exports = db;
})()
