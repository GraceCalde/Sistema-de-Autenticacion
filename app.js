import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});