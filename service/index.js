module.exports = function(db) {
    return {
        gameService: require('./game.service')(db),
        userService: require('./user.service')(db)
    }
};
