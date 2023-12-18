const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)

router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)

module.exports = router