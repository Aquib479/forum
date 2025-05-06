import { get } from "../utils/apiHelper";

// get the user profile detail with past post comment
export const profileDetail = async () => {
  const response = await get<{ success: boolean; data: any }>(
    "/api/user/profile"
  );
  return response;
};
