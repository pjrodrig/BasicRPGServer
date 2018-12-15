module.exports = function(db) {
    const api = {
        getGamesByUserId: (userId, resolve, reject) => {
            db.query(
                'SELECT data ' +
                'FROM (SELECT game_id as id ' +
                      'FROM rpguser_game ' +
                      'WHERE user_id = $1) rpguser_game INNER JOIN game ' +
                      'ON rpguser_game.id = game.id'
            , [userId], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve({games: res.rows.map(row => row.data)});
                }
            });
        },
        postGame: (game, resolve, reject) => {
            db.query(
                'INSERT INTO game ' +
                'VALUES($1) ' +
                'RETURNING *'
            , [game], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    let gameRes = res.rows[0];
                    gameRes.data.id = gameRes.id;
                    api.putGame(gameRes, resolve, reject);
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
                            console.error(playerErr);
                        }
                    });
                }
            });
        },
        putGame: (game, resolve, reject) => {
            db.query(
                'UPDATE game ' +
                'SET data = $1 ' +
                'WHERE id = $2 ' +
                'RETURNING *'
            , [game, game.id], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0].data);
                }
            });
        }
    };

    return api;
};
