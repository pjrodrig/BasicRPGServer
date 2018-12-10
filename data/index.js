module.exports = function(db) {
    return {
        userData: require('./user.data')(db),
        gameData: require('./game.data')(db)
    }
};
