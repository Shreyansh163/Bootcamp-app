import { Router } from "express";
import {
  login,
  register,
  getMe,
  updateUser,
  deleteUser,
  UploadUserPhoto,
} from "./../controllers/auth";
import { authorize, protect } from "./../middlewares/auth";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/me")
  .get(protect, authorize("publisher", "admin", "user"), getMe);
router
  .route("/update/:id")
  .put(protect, authorize("publisher", "admin", "user"), updateUser);
router
  .route("/uploaduserphoto/:id")
  .patch(protect, authorize("publisher", "admin", "user"), UploadUserPhoto);
router
  .route("/delete/:id")
  .delete(protect, authorize("admin", "user"), deleteUser);

export { router as authRouter };


