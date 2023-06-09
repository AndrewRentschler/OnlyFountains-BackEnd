const router = require('express').Router()
const ratingsCtrl = require('../controllers/ratings.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, ratingsCtrl.create)
router.post('/add-rating', checkAuth, ratingsCtrl.addRating)
router.get('/', ratingsCtrl.index)
router.get('/:id', checkAuth, ratingsCtrl.show)
router.put('/:id', checkAuth, ratingsCtrl.update)
router.delete('/:id', checkAuth, ratingsCtrl.destroy)

module.exports = router