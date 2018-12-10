/**
 * User controller
 * Manages system users
 */

module.exports = function(app, db) {
    const {userService} = require('../service')(db);

    app.get('/user', (req, res) => {
        if(req.query && req.query.username) {
            userService.getUser(req.query.username, user => {
                res.send(user);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "username"');
        }
    });

    app.get('/users', (req, res) => {
        if(req.query && req.query.usernames) {
            userService.getUsers(req.url.replace(/.*usernames=/, '').split(',').map(username => {
                return decodeURIComponent(username);
            }), users => {
                res.send({users});
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required parameter "usernames"');
        }
    });

    app.post('/user', (req, res) => {
        if(req.body && req.body.name) {
            userService.postUser(req.body.name, user => {
                res.send(user);
            }, err => {
                res.status(err.errorCode || 500).send(err.message);
            });
        } else {
            res.status(400).send('Missing required property "name"');
        }
    });
};
