module.exports = function(db) {
    const api = {
        getGame: (gameId, resolve, reject) => {
            db.query(
                'SELECT * ' +
                'FROM game ' +
                'WHERE id = $1'
            , [gameId], (err, res) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                } else {
                    let gameRow = res.rows[0];
                    gameRow.data.lastUpdated = new Date(gameRow.last_updated).getTime();
                    gameRow.data.created = new Date(gameRow.created).getTime();
                    resolve(gameRow.data);
                }
            });
        },
        getGamesByUserId: (userId, resolve, reject) => {
            db.query(
                'SELECT data ' +
                'FROM (SELECT game_id as id ' +
                      'FROM rpguser_game ' +
                      'WHERE user_id = $1) rpguser_game INNER JOIN game ' +
                      'ON rpguser_game.id = game.id'
            , [userId], (err, res) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                } else {
                    resolve({games: res.rows.map(row => {
                        row.data.lastUpdated = new Date(row.last_updated).getTime();
                        row.data.created = new Date(row.created).getTime();
                        return row.data;
                    })});
                }
            });
        },
        getLastUpdated: (gameId, resolve, reject) => {
            db.query(
                'SELECT last_updated ' +
                'FROM game ' +
                'WHERE id = $1'
            , [gameId], (err, res) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                } else {
                    resolve({lastUpdated:  new Date(res.rows[0].last_updated).getTime()});
                }
            });
        },
        postGame: (game, resolve, reject) => {
            db.query(
                'INSERT INTO game ' +
                'VALUES($1, (now() at time zone "utc"), (now() at time zone "utc")) ' +
                'RETURNING *'
            , [game], (err, res) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                } else {
                    let gameRes = res.rows[0];
                    gameRes.data.id = gameRes.id;
                    api.putGame(gameRes.data, resolve, reject);
                    let values = [];
                    let i = 0;
                    let insertionString = gameRes.data.players.map(player => {
                        values.push(player.id);
                        values.push(gameRes.id);
                        return `($${++i}, $${++i})`;
                    }).join(", ");
                    db.query(
                        'INSERT INTO rpguser_game ' + 
                        'VALUES ' + insertionString
                    , values, playerErr => {
                        if(playerErr) {
                            console.trace(playerErr);
                        }
                    });
                }
            });
        },
        putGame: (game, resolve, reject) => {
            db.query(
                'UPDATE game ' +
                'SET data = $1, last_updated = (now() at time zone "utc")' +
                'WHERE id = $2 ' +
                'RETURNING *'
            , [game, game.id], (err, res) => {
                if(err) {
                    console.trace(err);
                    reject(err);
                } else {
                    let gameRow = res.rows[0];
                    gameRow.data.lastUpdated = new Date(gameRow.last_updated).getTime();
                    gameRow.data.created = new Date(gameRow.created).getTime();
                    resolve(gameRow.data);
                }
            });
        }
    };

    return api;
};
