import express from 'express';
import {
    deleteUser,
    testing,
    updateUser,
    getUserListings,
    getUser,
    addFavoriteCar,
    getFavoriteCar,
    deleteFavoriteCar,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', testing);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);
router.post('/favorites/:id', verifyToken, addFavoriteCar);
router.get('/getFavoriteCar/:id', verifyToken, getFavoriteCar);
router.post('/deleteFavoriteCar/:id', verifyToken, deleteFavoriteCar);

export default router;
