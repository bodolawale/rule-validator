import Router from "express";
import ValidationController from "../controllers/validationController";
import UtilService from "../services/utilService";

const router = Router();
const { catchAsync, } = UtilService;

router.get("/", catchAsync(ValidationController.base,),);

router.post("/validate-rule", catchAsync(ValidationController.validate,),);

export default router;
