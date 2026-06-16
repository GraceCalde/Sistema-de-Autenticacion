import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { isAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Ruta privada protegida por el middleware
router.get('/private', isAuth, (req, res) => {
    res.status(200).json({
    message: '¡Bienvenido a la ruta privada!',
    user: req.user
    });
});

export default router;