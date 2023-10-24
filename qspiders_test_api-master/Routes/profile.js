import { Router } from "express";
import {
  CreateProfile,
  GetProfile,
  UpdatedProfile,
} from "./../controllers/profile";
import { authorize, protect } from "../middlewares/auth";

let router = Router();
router
  .route("/view/:id")
  .get(protect, authorize("user", "publisher", "admin"), GetProfile)
router
  .route("/")
  .post(protect, authorize("user", "publisher", "admin"), CreateProfile);
router
  .route("/update/:id")
  .put(protect, authorize("user", "publisher", "admin"), UpdatedProfile);

export { router as Profile };
