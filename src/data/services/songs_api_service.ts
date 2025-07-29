import type { ISong } from "../../interfaces/ISong";
import { axiosInstance } from "../axios_instance";
import { BASE_URL } from "../constans";

class SongsApiService {
    private static instance: SongsApiService;

    public static getInstance(): SongsApiService {
        if (!SongsApiService.instance) {
            SongsApiService.instance = new SongsApiService();
        }
        return SongsApiService.instance;
    }

    public async getSongs(): Promise<ISong[]> {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/api/songs/get_all`);
            return response.data;    
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default SongsApiService.getInstance();