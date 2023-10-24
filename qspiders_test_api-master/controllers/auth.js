import {
  JWT_COOKIE_EXPIRE,
  NODE_ENV,
  MAX_PHOTO_UPLOAD,
  PHOTO_UPLOAD,
} from "../Config";
import path from "path";
import { asyncHandler } from "../middlewares/async";
import { UserModel } from "../Models/User";
import { ErrorResponse } from "./../uitils/ErrorResponse";
import { ProfileModel } from "./../Models/Profile";

/*@Desc POST ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/auth/register'
*/

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 201, res);
});

/*@Desc POST ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/auth/login'
*/

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email && password
  if (!email || !password) {
    return next(new ErrorResponse("please provide an email and password", 400));
  }
  //check for user
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("User not exits", 401));
  }
  //check if password match
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Password is not match", 401));
  }

  sendTokenResponse(user, 201, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

/*@Desc GET CURRENT logged in user
  @ACCESS PRIVATE
  @ROUTE '/api/v1/auth/me'
*/

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      let updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      return next(new ErrorResponse("not authorized", 401));
    }
  } else {
    return next(new ErrorResponse("not authorized", 401));
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      if (req.user.id) {
        let DELETED_USER = await UserModel.deleteOne({
          _id: req.user.id,
        });
        await ProfileModel.findOneAndRemove({ user: req.user.id });
        res.status(203).json({
          success: true,
          data: DELETED_USER,
        });
      } else {
        return next(new ErrorResponse("not authorized", 401));
      }
    } catch (error) {
      return next(new ErrorResponse("not authorized", 401));
    }
  } else {
    return next(new ErrorResponse("not authorized", 401));
  }
});

//upload user photo

export const UploadUserPhoto = asyncHandler(async (req, res, next) => {
  let user = await UserModel.findOne({ _id: req.user.id });

  if (req.params.id === req.user.id) {
    if (!req.files) {
      return next(new ErrorResponse(`please upload file`), 400);
    }
    let file = req.files.photo;
    if (!file.mimetype.startsWith("image")) {
      return next(
        new ErrorResponse(`Please upload a image file ex: png , jpg`, 400)
      );
    }
    if (file.size > MAX_PHOTO_UPLOAD) {
      new ErrorResponse(
        `Please upload a image less than ${MAX_PHOTO_UPLOAD}`,
        400
      );
    }
    file.name = `photo_${user._id}${path.parse(file.name).ext}`;
    file.mv(`${PHOTO_UPLOAD}/${file.name}`, async err => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
      await UserModel.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
      res.status(201).json({ success: true, data: file.name });
    });
  }
});
