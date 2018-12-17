module.exports = function(db) {
    const {gameData} = require('../data')(db);
    return {
        putPlayer: (gameId, player, resolve, reject) => {
            gameData.getGame(gameId, game => {
                for(let i = 0; i < game.players.length; i++) {
                    if(game.players[i].id === player.id) {
                        game.players[i] = player;
                        break;
                    }
                }
                if(!game.isStarted) {
                    let playersReady = true;
                    for(let i = 0; i < game.players.length && playersReady; i++) {
                        playersReady = game.players[i].isInitialized;
                    }
                    game.isStarted = playersReady;
                    if(game.isStarted) {
                        let reorderedPlayers = [];
                        while(game.players.length) {
                            reorderedPlayers.push(game.players.splice(Math.floor(Math.random() * game.players.length), 1));
                        }
                        game.players = reorderedPlayers;
                    }
                }
                gameData.putGame(game, resolve, reject);
            }, reject);
        }
    }
};
