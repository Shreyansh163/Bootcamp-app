import { Router } from "express";

import {
  CreateBootCamps,
  getBootCamp,
  GetBootCamps,
  updateBootCamp,
  deleteBootCamp,
  bootCampPhotoUpload,
} from "../controllers/bootcamp";
import { authorize, protect } from "../middlewares/auth";
import { Courses } from "./course";
let router = Router();

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootCampPhotoUpload);
router.use("/:bootcampId/courses", Courses);
router.route("/get-bootcamps").get(GetBootCamps);
router.route("/get-bootcamps/:id").get(getBootCamp);
router
  .route("/")
  .post(protect, authorize("publisher", "admin"), CreateBootCamps);
router
  .route("/get-bootcamps/:id")
  .put(protect, authorize("publisher", "admin"), updateBootCamp);
router
  .route("/get-bootcamps/:id")
  .delete(protect, authorize("publisher", "admin"), deleteBootCamp);

export { router as BootCamp };
