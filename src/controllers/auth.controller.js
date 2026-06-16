import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// REGISTRO
export const register = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    // Verificar si el email ya está registrado
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email ya está registrado' });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Guardar en la base de datos
    const newUser = await prisma.user.create({
        data: {
        email,
        password: hashedPassword
        }
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id });
    } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// 2. LOGIN
export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Buscar al usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Validar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Contraseña inválida' });
    }

    // Generar Access Token (JWT) con tiempo de expiración 
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
        } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};