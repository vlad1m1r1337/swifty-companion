import qs from "qs";
import axios, {AxiosError} from "axios";

export async function getAccessToken(setToken: (token: string) => void) {
    const tokenUrl = "https://api.intra.42.fr/oauth/token";
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const data = qs.stringify({
        grant_type: "client_credentials",
        client_id: UID,
        client_secret: SECRET,
    });
    try {
        const response = await axios.post(tokenUrl, data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        setToken(response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching cursus data:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
}