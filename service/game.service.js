module.exports = function(db){
    const {gameData, userData} = require('../data')(db);
    return {
        getGamesByUserId: (userId, resolve, reject) => {
            gameData.getGamesByUserId(userId, resolve, reject);
        },
        postGame: (game, resolve, reject) => {
            gameData.postGame(game, resolve, reject);
        }
    }
};
