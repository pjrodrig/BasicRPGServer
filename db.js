const pg = require('pg');

(function() {
    const db = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'basicrpgserver',
        database: 'basicrpg'
    });

    db.connect((err) => {
        if (err) {
            console.error('Connection error', err.stack)
        } else {
            console.log('Connected')
        }
    });

    db.query('CREATE TABLE IF NOT EXISTS public.rpguser (name citext NOT NULL, id bigserial NOT NULL, PRIMARY KEY (id), CONSTRAINT "uniqueName" UNIQUE (name));');
    db.query('CREATE TABLE IF NOT EXISTS public.game (data json NOT NULL, id bigserial NOT NULL, PRIMARY KEY (id))');
    db.query('CREATE TABLE IF NOT EXISTS public.rpguser_game (user_id bigint NOT NULL, game_id bigint NOT NULL, PRIMARY KEY (user_id, game_id), CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.rpguser (id) ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT game_id FOREIGN KEY (game_id) REFERENCES public.game (id) ON UPDATE NO ACTION ON DELETE CASCADE)');

    module.exports = db;
})()
