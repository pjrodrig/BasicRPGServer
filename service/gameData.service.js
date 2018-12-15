module.exports = function(db){
    const {gameDataData} = require('../data')(db);
    return {
        getGamesByUserId: (gameId, resolve, reject) => {
            gameDataData.getGameData(gameId, resolve, reject);
        },
        postGame: (game, resolve, reject) => {
            gameDataData.postGameData(game, resolve, reject);
        },
        putGame: (game, resolve, reject) => {
            gameDataData.putGameData(game, resolve, reject);
        }
    }
};
