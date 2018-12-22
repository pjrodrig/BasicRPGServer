const pg = require('pg');

(function() {
    const db = new pg.Pool({
        host: 'localhost',
        port: '5432'
    });

    db.query('CREATE TABLE IF NOT EXISTS public.rpguser (id bigserial NOT NULL, name citext NOT NULL, PRIMARY KEY (id), CONSTRAINT "uniqueName" UNIQUE (name));');
    db.query('CREATE TABLE IF NOT EXISTS public.game (id bigserial NOT NULL, data json NOT NULL, last_updated timestamp without time zone NOT NULL, created timestamp without time zone NOT NULL, PRIMARY KEY (id))');
    db.query('CREATE TABLE IF NOT EXISTS public.rpguser_game (user_id bigint NOT NULL, game_id bigint NOT NULL, PRIMARY KEY (user_id, game_id), CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.rpguser (id) ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT game_id FOREIGN KEY (game_id) REFERENCES public.game (id) ON UPDATE NO ACTION ON DELETE CASCADE)');
    db.query('CREATE TABLE IF NOT EXISTS public.game_data (id bigint NOT NULL, data json NOT NULL, PRIMARY KEY (id), CONSTRAINT gameId FOREIGN KEY (id) REFERENCES public.game (id) ON UPDATE NO ACTION ON DELETE CASCADE)');

    module.exports = {
        query: (text, values, callback) => {
           pg.connect((err, client, done) => {
            if (err) {
                console.error('Connection error', err.stack)
            } else {
                client.query(text, values, (err, result) => {
                    done();
                    callback(err, result);
                });
            }
           });
        }
     };
})()
