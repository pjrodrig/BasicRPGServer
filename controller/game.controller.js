/**
 * Game controller
 * Loads/Saves entire game states from document database
 */

module.exports = function(app, db) {
    const {gameService} = require('../service')(db);

    app.get('/game', (req, res) => {

    });

    app.get('/games/user', (req, res) => {
        if(req.query && req.query.userId) {
            gameService.getGames(req.query.userId, games => {
                res.send(games);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "userId"');
        }
    });

    app.post('/game', (req, res) => {
        if(req.body) {
            gameService.postGame(req.body, game => {
                res.send(game);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing request body');
        }
    });
};
