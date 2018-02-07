const members = require('../controllers/members');

module.exports = (router) => {
    
    router.use(members.authenticate)
    
    router.route('/members')
    .get(members.getInfo)

};