import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Index } from "@/app/index";
import { MoreInfo } from "@/app/more-info";
import { useEffect, useState } from "react";
import { User } from "@/app/types/user";
import { colors } from "@/app/constants";
import { getAccessToken } from "@/app/requests";

const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        getAccessToken();
    }, [token]);

    return (
        <Tab.Navigator
            initialRouteName="Index"
            screenOptions={{
                tabBarPosition: 'bottom', // Располагаем вкладки внизу
                tabBarStyle: {
                    backgroundColor: colors.secondaryBackground,
                    borderColor: colors.secondaryBackground,
                    height: 50,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarActiveTintColor: colors.primaryPurple,
                tabBarInactiveTintColor: 'white',
                tabBarIndicatorStyle: {
                    display: 'none', // Убираем индикатор активной вкладки
                },
            }}
        >
            <Tab.Screen
                name="Index"
                options={{ tabBarLabel: "Main", tabBarIcon: () => (<></>) }}
            >
                {(props) => (
                    <Index
                        {...props}
                        token={token}
                        setUser={setUser}
                        setToken={setToken}
                        user={user}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="MoreInfo"
                options={{ tabBarLabel: "More Info", tabBarIcon: () => (<></>) }}
            >
                {(props) => <MoreInfo {...props} user={user} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}