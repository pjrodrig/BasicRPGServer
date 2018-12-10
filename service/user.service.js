module.exports = function(db) {
    const {userData} = require('../data')(db);
    return {
        getUser: (username, resolve, reject) => {
            userData.getUserByName(username, resolve, reject);
        },
        getUsers: (usernames, resolve, reject) => {
            let userPromises = usernames.map(username => {
                return new Promise(mapResolve => {
                    userData.getUserByName(username, user => {
                        mapResolve(user);
                    }, err => {
                        err.username = username;
                        mapResolve(err);
                    });
                });
            });
            Promise.all(userPromises).then(res => {
                let errors = [];
                let fatal;
                for(let i = 0; i < res.length; i++) {
                    let user = res[i];
                    if(user.errorCode) {
                        if(user.errorCode === 404) {
                            errors.push(user.username);
                        } else {
                            fatal = user;
                        }
                    }
                }
                if(fatal) {
                    delete fatal.username;
                    reject(fatal);
                } else if(errors.length) {
                    reject({
                        errorCode: 404,
                        message: `The following users do no exist: "${errors.join('", "')}"`
                    });
                } else {
                    resolve(res);
                }
            });
        },
        postUser: (username, resolve, reject) => {
            userData.post(username, resolve, reject);
        }
    }
};
