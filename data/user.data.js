module.exports = function(db) {
    return {
        getUserByName: (username, resolve, reject) => {
            db.query(
                "SELECT * " +
                "FROM boardrpg.user " +
                "WHERE name=$1"
            , [username], (err, res) => {
                if(err) {
                    reject(err);
                } else if(res.rows.length){
                    resolve(res.rows[0]);
                } else {
                    reject({
                        errorCode: 404,
                        message: `User with username '${username}' not found`
                    });
                }
            });
        },
        //TODO: make username check case insensitive
        post: (username, resolve, reject) => {
            db.query(
                "INSERT INTO boardrpg.user " +
                "VALUES($1) " +
                "RETURNING *"
            , [username], (err, res) => {
                if(err) {
                    if(err.constraint === "uniqueName") {
                        reject({
                            errorCode: 409,
                            message: `Username '${username}' already exists`
                        });
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(res.rows[0]);
                }
            });
        }
    }
};
