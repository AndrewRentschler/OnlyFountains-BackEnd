const router = require('express').Router()
const fountainsCtrl = require('../controllers/fountains.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.get('/:lat/:lon/:rad', fountainsCtrl.searchDrinkingFountains)
router.get('/:id', fountainsCtrl.show)
router.put('/:id', checkAuth, fountainsCtrl.update)
router.delete('/:id', checkAuth, fountainsCtrl.destroy)

module.exports = router