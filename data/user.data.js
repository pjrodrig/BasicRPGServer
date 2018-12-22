module.exports = function(db) {
    const api = {
        getUserByName: (username, resolve, reject) => {
            db.query(
                'SELECT * ' +
                'FROM rpguser ' +
                'WHERE name=$1'
            , [username], (err, res) => {
                if(err) {
                    console.trace(err);
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
                'INSERT INTO rpguser ' +
                'VALUES(DEFAULT, $1) ' +
                'RETURNING *'
            , [username], (err, res) => {
                if(err) {
                    console.trace(err);
                    if(err.constraint === 'uniqueName') {
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
    };

    return api;
};
