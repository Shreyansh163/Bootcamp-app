import { CourseModel } from "../Models/CourseModel";
import { VideoModel } from "../Models/VideoModel";
import { asyncHandler } from "../middlewares/async";
import { ErrorResponse } from "./../uitils/ErrorResponse";
/*@Desc GET ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamps/:bootcampId/courses'
*/

export let getVideos = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.videoId) {
    query = VideoModel.find({
      course: req.params.bootcampId,
    });
  } else {
    query = VideoModel.find().populate({
      path: "course",
      select: "name description",
    });
  }
  const videos = await query;
  res.status(200).json({
    success: true,
    message: "fetch videos",
    data: videos,
    count: videos.length,
  });
});

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamps/:bootcampIf/courses'
*/

export let CreateCourse = asyncHandler(async (req, res, next) => {
  req.body.course = req.params.courseId;
  const course = await CourseModel.findById(req.params.courseId);
  if (!course) {
    return next(
      new ErrorResponse(`no bootcamp with id of ${req.params.courseId}`, 404)
    );
  }
  let video = await VideoModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "created new Video",
    data: video,
  });
});

export let updateCourse = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(new ErrorResponse(`course not found`, 404));
  }
  res.status(201).json({ success: true, data: course });
});

/*@Desc DELETE ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await CourseModel.findById(req.params.id, {
    runValidators: true,
  });
  if (!course) {
    return next(new ErrorResponse(`course not found`, 404));
  }
  await course.remove();
  res.status(200).json({ success: true, data: {} });
});
