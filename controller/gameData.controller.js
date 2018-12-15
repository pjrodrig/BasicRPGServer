/**
 * Game controller
 * Loads/Saves entire game states from document database
 */

module.exports = function(app, db) {
    const {gameDataService} = require('../service')(db);

    app.get('/gameData', (req, res) => {
        if(req.query && req.query.gameId) {
            gameDataService.getGameData(req.query.gameId, user => {
                res.send(user);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "gameId"');
        }
    });

    app.post('/gameData', (req, res) => {
        if(req.body) {
            gameDataService.postGameData(req.body, game => {
                res.send(game);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing request body');
        }
    });

    app.put('/gameData', (req, res) => {
        if(req.body) {
            gameDataService.putGameData(req.body, game => {
                res.send(game);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing request body');
        }
    });
};
