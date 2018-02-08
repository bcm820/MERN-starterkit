const members = require('../controllers/members');

module.exports = (router) => {
    router.use(members.authenticate)
    router.get('/members', members.getInfo)

};