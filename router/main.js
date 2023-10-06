const express = require('express');
const router = express.Router();
const {requireAuth,checkUser} = require('../middleware/auth')


const {
    register,
    signIn,
    signupUser,
    productCategory,
    loginUser,
} = require('../controller/main');

router.get('/register', register);
router.get('/login', signIn);
router.get('/productCategory', requireAuth, productCategory)
router.post('/register', signupUser);
router.post('/login', loginUser)



module.exports = router;