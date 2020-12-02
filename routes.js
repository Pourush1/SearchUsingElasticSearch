const router = require('express').Router()
const SuggestTextController = require('./controller/suggestText')
const CreateIndexController = require('./controller/createIndex')

router.get('/suggest/:text', SuggestTextController.suggest)
router.post('/create/:text', CreateIndexController.checkIndices)

module.exports = router