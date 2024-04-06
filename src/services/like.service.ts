import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import prisma from "../client";
import { Like, Option, Post, PostType, Prisma, User } from "@prisma/client";
import { CollegePost } from "../types/Posts";
import postService from "./post.service";

/**
 * Like a post
 * @param {string} postId
 * @param {string} userId
 */

const likePost = async (postId: string, userId: string) => {
  const post = await postService.getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }
  const alreadyLikedPost = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });
  if (alreadyLikedPost) {
    await prisma.like.delete({
      where: {
        id: alreadyLikedPost.id,
      },
    });
    return {
      message: "Post unliked",
      Post: await postService.getPostById(postId),
    };
  }

  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  return {
    ...like,
    message: "Post Liked",
    Post: await postService.getPostById(postId),
  };
};

export default {
  likePost,
};
