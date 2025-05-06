import { Forum } from "@/types/index";
import { del, get, post, put } from "../utils/apiHelper";

interface addForumData {
  title: string;
  description: string;
  tags: any;
}

interface updateForumData {
  title?: string;
  description?: string;
  tags?: any;
}

// @method  POST
// @desc    add new forum
export const addForum = async (data: addForumData) => {
  const response = await post<{ success: boolean; data: Forum[] }>(
    "/api/forums",
    data
  );
  return response;
};

// @method  POST
// @desc    like forum
export const LikeForum = async (forumId: string) => {
  const response = await post<{ success: boolean; data: Forum[] }>(
    `/api/forums/${forumId}/like`
  );
  return response;
};

// @method  GET
// @desc    getAll forums
export const getForums = async () => {
  const response = await get<{ success: boolean; data: Forum[] }>(
    "/api/forums"
  );
  return response;
};

// @method  PUT
// @desc    update forum
export const updateForum = async (forumId: string, data: updateForumData) => {
  const response = await put<{ success: boolean; data: Forum[] }>(
    `/api/forums/${forumId}`,
    data
  );
  return response;
};

// @method  DELETE
// @desc    delete forum
export const deleteForum = async (forumId: string) => {
  const response = await del<{ success: boolean; message: string }>(
    `/api/forums/${forumId}`
  );
  return response;
};
