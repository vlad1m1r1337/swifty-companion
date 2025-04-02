import axios from "axios";
import { User } from "@/app/types/user";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Сохранение данных
export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
};

// Получение данных
const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
};


// Функция для получения нового токена
export async function getAccessToken() {
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    try {
        const response = await axios.post("https://api.intra.42.fr/oauth/token", {
            grant_type: "client_credentials",
            client_id: UID,
            client_secret: SECRET,
        });
        const token = response.data.access_token;
        storeData('token', token);
    } catch (error) {
        console.error("Ошибка получения токена:", error);
        return null;
    }
}

// Создаём экземпляр axios с автоматической подстановкой токена
const apiClient = axios.create({
    baseURL: "https://api.intra.42.fr/v2",
});


apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log("Токен истёк, обновляем...");
            await getAccessToken();
            const newToken = await getData('token');
            if (newToken) {
                error.config.headers["Authorization"] = `Bearer ${newToken}`;
                return apiClient.request(error.config); // Повторяем запрос с новым токеном
            }
        }
        return Promise.reject(error);
    }
);

// Функция для получения данных пользователя
export async function getUserData(user: string): Promise<User | undefined> {
    const token = await getData('token');
    try {
        const response = await apiClient.get(`/users/${user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
    }
}
