const express = require('express');
const router = express.Router();
const {createTask,
    deleteTask,
    checkHealth,
    getMyTask
} = require('../controllers/task');
    const auth=require('../middleware/auth');

router.post('/create',auth, createTask);
router.delete('/delete/:id',auth, deleteTask);
//router.get('/health/:id',auth, checkHealth);
router.get('/mytask',auth, getMyTask);


module.exports = router;