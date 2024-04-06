import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { postService } from "../services";
import { User } from "@prisma/client";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import { uploadBlob } from "../library/azure";

const createPost = catchAsync(async (req, res) => {
  const user = req.user as User;
  const { content, title, media } = req.body;
  const post = await postService.createPost(
    content,
    user.id,
    title,
    media,
    user.collegeId ?? undefined
  );
  res.status(httpStatus.CREATED).send(post);
});

const createPoll = catchAsync(async (req, res) => {
  const user = req.user as User;
  const { content, title, media, options } = req.body;
  const poll = await postService.createPoll(
    content,
    user.id,
    options,
    title,
    media,
    user.collegeId ?? undefined
  );
  res.status(httpStatus.CREATED).send(poll);
});

const uploadMedia = catchAsync(async (req, res) => {
  const uploadMediaResponse = await uploadBlob(req);
  res.status(httpStatus.CREATED).send({
    mediaUrl: uploadMediaResponse,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const post = await postService.getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }
  res.send(post);
});

const queryCollegePosts = catchAsync(async (req, res) => {
  const user = req.user as User;
  const entityId = user.collegeId ?? undefined;
  const search = req.query.search ? String(req.query.search) : undefined;
  const filter = pick(req.query, ["authorId", "PostType"]);
  const options = pick(req.query, ["limit", "cursor", "sortBy", "sortType"]);
  const response = await postService.queryCollegePosts({
    entityId,
    search,
    filter,
    options,
  });
  res.send(response);
});

export default {
  createPost,
  createPoll,
  getPostById,
  queryCollegePosts,
  uploadMedia,
};
