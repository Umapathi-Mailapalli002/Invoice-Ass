import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createSale, deleteSale, getAllSales, getMostSoldProducts, updateSale } from "../controllers/sales.controller.js";

const router = Router();

router.route('/create-sale').post(verifyJWT, createSale);
router.route('/getAll-sales').get(verifyJWT, getAllSales);
router.route('/most-sold').get(verifyJWT, getMostSoldProducts);
router.route('/update-sale/:id').patch(verifyJWT, updateSale);
router.route('/delete-sale/:id').delete(verifyJWT, deleteSale);

export default router;



