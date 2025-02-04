import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import {Index} from "@/app/index";
import {MoreInfo} from "@/app/more-info";
import {useEffect, useState} from "react";
import {User} from "@/app/types/user";
import qs from "qs";
import axios, {AxiosError} from "axios";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const [token, setToken] = useState();
    const [user, setUser] = useState<User | undefined>();
    const [text, onChangeText] = useState('');
    useEffect(() => {
        async function getAccessToken() {
            const tokenUrl = "https://api.intra.42.fr/oauth/token";
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

        if(token) return;
        getAccessToken();
    }, [token]);

    return (
      <Tab.Navigator
          initialRouteName="Index"
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          }}
      >
          <Tab.Screen
              name="Index"
              options={{ tabBarLabel: "Домашняя", headerShown: false }}
          >
              {(props) => <Index {...props} token={token} setUser={setUser} user={user} />}
          </Tab.Screen>
        <Tab.Screen
            name="MoreInfo"
            options={{ tabBarLabel: 'Подробнее', headerShown: false }}
        >
            {(props) => <MoreInfo {...props} user={user} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
}
