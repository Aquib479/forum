import { Comment } from "@/types/index";
import { del, get, post } from "../utils/apiHelper";

interface addCommonData {
  content: string;
}

export const getForumComments = async (forumId: string) => {
  const response = await get<{ success: boolean; data: Comment[] }>(
    `/api/forums/${forumId}/comments`
  );
  return response;
};

// @method  POST
// @desc    add new comment to forum
export const addComment = async (forumId: string, data: addCommonData) => {
  const response = await post<{ success: boolean; data: Comment[] }>(
    `/api/forums/${forumId}/comments`,
    data
  );
  return response;
};

// @method  DELETE
// @desc    delete comment from forum
export const deleteComment = async (forumId: string, commentId: string) => {
  const response = await del<{ success: boolean; data: Comment[] }>(
    `/api/forums/${forumId}/comments/${commentId}`
  );
  return response;
};
