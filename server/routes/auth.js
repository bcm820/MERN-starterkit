const auth = require('../controllers/auths');

module.exports = (app) => {
    
    app.route('/auth')
    .post(auth.register)
    .put(auth.login)
    .delete(auth.logout)

};