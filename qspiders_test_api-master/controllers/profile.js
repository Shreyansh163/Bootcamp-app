import { ProfileModel } from "../Models/Profile";
import { asyncHandler } from "../middlewares/async";
import { UserModel } from "../Models/User";
import { ErrorResponse } from "./../uitils/ErrorResponse";

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/profile'
*/
export let CreateProfile = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  req.body.user = user.id;
  if (!req.body.user) {
    return next(new ErrorResponse(`no user with id of ${req.user}`, 404));
  }
  let profile = await ProfileModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "profile has been created",
    data: profile,
  });
});

/*@Desc PUT ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/profile'
*/
export const UpdatedProfile = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    try {
      let profile = await ProfileModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(profile);
      res.status(201).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      return next(new ErrorResponse("not authorized", 401));
    }
  } else {
    return next(new ErrorResponse("not authorized😃", 401));
  }
});

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp'
*/
export let GetProfile = asyncHandler(async (req, res, next) => {
  try {
    let profile = await ProfileModel.findOne(req.params.id)
      .populate({ path: "user", select: { role: 0 } })
      .exec();

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    return next(new ErrorResponse(error, 404));
  }
});
