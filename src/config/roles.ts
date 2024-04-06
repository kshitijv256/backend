import { Role } from "@prisma/client";

const allRoles = {
  [Role.USER]: [
    "createPost",
    "createPoll",
    "createComment",
    "votePoll",
    "commentPost",
    "queryCollegePosts",
    "currentUser",
    "uploadMedia",
    "queryCommentsForPost",
    "getPostById",
    "likePost",
    "getExplanation",
  ],
  [Role.ADMIN]: ["getUsers", "manageUsers"],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
