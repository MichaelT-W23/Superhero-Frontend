// @ts-ignore
import axiosInstance from '../lib/axios';
// @ts-ignore
import handleError from '../utils/apiError';

import {
  fetchUserByUsername,
  loginUser,
  createUser
} from "../api/userAPI";

interface UserDTO {
  id: number;
  name: string;
  username: string;
}

interface UserAuthRequest {
  username: string;
  password: string;
}

interface UserAddRequest {
  name: string;
  username: string;
  password: string;
}

export const UserService = {

  async getUserByUsername(username: string): Promise<UserDTO | null> {
    try {
      const user = await fetchUserByUsername(username);
      return user;
    } catch (error) {
      handleError(error); 
      return null;
    }
  },

  async authenticateUser(request: UserAuthRequest): Promise<UserDTO | null> {
    try {
      const loginSuccessful = await loginUser(request);
      return loginSuccessful;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async addUser(request: UserAddRequest): Promise<string | null> {
    try {
      const userCreated = await createUser(request);
      return userCreated;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
