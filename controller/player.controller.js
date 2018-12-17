module.exports = function(app, db) {
    const {playerService} = require('../service')(db);

    app.put('/player', (req, res) => {
        if(req.query && req.query.gameId) {
            if(req.body) {
                playerService.putPlayer(req.query.gameId, req.body, game => {
                    res.send(game);
                }, err => {
                    res.status(err.errorCode || 500).send(err.message);
                });
            } else {
                res.status(400).send('Missing request body');
            }
        } else {
            res.status(400).send('Missing required parameter "gameId"');
        }
    });
};
