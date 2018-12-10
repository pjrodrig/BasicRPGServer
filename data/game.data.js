module.exports = function(db) {
    return {
        getGamesByUserId: (userId, resolve, reject) => {
            db.query(
                "SELECT *" +
                "FROM (" +
                    "SELECT gameId" +
                    "FROM boardrpg.userGames" +
                    "WHERE userId=$1" +
                ") INNER JOIN (" +

                ")"
            , [userId], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        },
        postGame: (game, resolve, reject) => {
            db.query(
                "INSERT INTO boardrpg.game " +
                "VALUES($1) " +
                "RETURNING *"
            , [game], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            });
        }
    }
};
