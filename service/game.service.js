module.exports = function(db){
    const {gameData} = require('../data')(db);
    return {
        getGame: (gameId, resolve, reject) => {
            gameData.getGame(gameId, resolve, reject);
        },
        getGamesByUserId: (userId, resolve, reject) => {
            gameData.getGamesByUserId(userId, resolve, reject);
        },
        getLastUpdated: (gameId, resolve, reject) => {
            gameData.getLastUpdated(gameId, resolve, reject);
        },
        postGame: (game, resolve, reject) => {
            gameData.postGame(game, resolve, reject);
        },
        putGame: (game, resolve, reject) => {
            gameData.putGame(game, resolve, reject);
        }
    }
};
