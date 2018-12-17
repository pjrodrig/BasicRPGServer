/**
 * Game controller
 * Loads/Saves entire game states from document database
 */

module.exports = function(app, db) {
    const {gameService} = require('../service')(db);

    app.get('/game', (req, res) => {
        
    });

    app.get('/game/user', (req, res) => {
        if(req.query && req.query.userId) {
            gameService.getGamesByUserId(req.query.userId, games => {
                res.send(games);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "userId"');
        }
    });

    app.get('/game/lastUpdated', (req, res) => {
        console.log("Received request for /game/lastUpdated");
        if(req.query && req.query.gameId) {
            gameService.getLastUpdated(req.query.gameId, created => {
                res.send(created);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "gameId"');
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

    app.put('/game', (req, res) => {
        if(req.body) {
            gameService.putGame(req.body, game => {
                res.send(game);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing request body');
        }
    });
};
