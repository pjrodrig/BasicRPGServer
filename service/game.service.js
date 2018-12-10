module.exports = function(db){
    const {gameData} = require('../data')(db);
    return {
        getGames: (userId) => {
            gameData.get(username, resolve, reject);
        },
        postGame: (game, resolve, reject) => {
            gameData.postGame(game, res => {
                res.data.id = res.id;
                resolve(res.data);
            }, reject);
        }
    }
};
