const router = require('express').Router()
const SuggestTextController = require('./controller/suggestText')

router.get('/suggest/:text', SuggestTextController.suggest)

module.exports = router