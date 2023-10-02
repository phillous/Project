const express = require('express');
const router = express.Router();

const {
    register,
    signIn,
    signupUser,
    productCategory,
    loginUser,
} = require('../controller/main');

router.get('/', register);
router.get('/signIn', signIn);
router.get('/productCategory', productCategory)
router.post('/register', signupUser);
router.post('/login', loginUser)



module.exports = router;