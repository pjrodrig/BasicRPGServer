module.exports = function(db) {
    const api = {
        getGameData: (gameId, resolve, reject) => {
            db.query(
                'SELECT * ' +
                'FROM game_data ' +
                'WHERE id = $1'
            , [gameId], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0].data);
                }
            });
        },
        postGameData: (gameData, resolve, reject) => {
            db.query(
                'INSERT INTO game_data ' +
                'VALUES($1, $2) ' +
                'RETURNING *'
            , [gameData, gameData.id], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0].data);
                }
            });
        },
        putGameData: (gameData, resolve, reject) => {
            db.query(
                'UPDATE game_data ' +
                'SET data = $1 ' +
                'WHERE id = $2 ' +
                'RETURNING *'
            , [gameData, gameData.id], (err, res) => {
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
