import express from 'express';
import { register, login, current } from '../controllers/user_controller';
import { validateToken } from '../middleware/validate_token';

const router = express.Router();

router.post('/register', (req, res) => {
    /*
    #swagger.summary = 'Register account';
    #swagger.description = 'testing description';
    #swagger.parameters['body'] = {
        required: true,     
        in: 'body',   
        schema: { $ref: '#/components/schemas/LoginRequest' },
    };
    */
    return register(req, res);
});

router.post('/login', (req, res) => {
    /*
    #swagger.summary = 'Login to get an access token';
    #swagger.description = 'testing description';
    #swagger.parameters['body'] = {
        required: true,     
        in: 'body',   
        schema: { $ref: '#/components/schemas/LoginRequest' },
    };
    */
    return login(req, res);
});

router.get('/current', validateToken, current);

export default router;
