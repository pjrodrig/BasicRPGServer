module.exports = function(app, db) {
    gameController: require('./game.controller')(app, db);
    userController: require('./user.controller')(app, db);
    playerController: require('./player.controller')(app, db);
};
