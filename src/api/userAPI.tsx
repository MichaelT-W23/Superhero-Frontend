// @ts-ignore
import axiosInstance from '../lib/axios.js';

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

export async function fetchUserByUsername(username: string): Promise<UserDTO | null> {
  try {
    const response = await axiosInstance.get(`/api/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function loginUser(request: UserAuthRequest): Promise<UserDTO | null> {
  try {
    const response = await axiosInstance.post('/api/users/authenticate', request);
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error);
    return null;
  }
}

export async function createUser(request: UserAddRequest): Promise<string | null> {
  try {
    const response = await axiosInstance.post('/api/users/add', request);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
}