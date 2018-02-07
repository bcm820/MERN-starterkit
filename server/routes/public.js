const auths = require('../controllers/auths');

module.exports = (router) => {
    
    router.route('/auth')
    .post(auths.register)
    .put(auths.login)

};