module.exports = function(db) {
    return {
        getGamesByUserId: (userId, resolve, reject) => {
            db.query(
                'SELECT data ' +
                'FROM (SELECT game_id as id ' +
                      'FROM boardrpg.user_game ' +
                      'WHERE user_id = $1) user_game INNER JOIN boardrpg.game ' +
                      'ON user_game.id = boardrpg.game.id'
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
                    let values = [];
                    let i = 0;
                    let insertionString = gameRes.data.players.map(player => {
                        values.push(player.userId);
                        values.push(gameRes.id);
                        return `($${++i}, $${++i})`;
                    }).join(", ");
                    db.query(
                        'INSERT INTO rpguser_game ' + 
                        'VALUES ' + insertionString
                    ,values, playerErr => {
                        if(playerErr) {
                            console.error(playerErr);
                        }
                    });
                    db.query(
                        'UPDATE game ' + 
                        'SET data = $1 ' +
                        'WHERE id = $2 ' +
                        'RETURNING *'
                    , [gameRes.data, gameRes.id], (gameErr, secondGameRes) => {
                        if(gameErr) {
                            console.error(gameErr);
                        }
                        resolve(secondGameRes.rows[0].data);
                    });
                }
            });
        }
    }
};
