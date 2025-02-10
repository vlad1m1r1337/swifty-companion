import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import {Index} from "@/app/index";
import {MoreInfo} from "@/app/more-info";
import {useEffect, useState} from "react";
import {User} from "@/app/types/user";
import qs from "qs";
import axios, {AxiosError} from "axios";
import {colors} from "@/app/constants";
import {getAccessToken} from "@/app/requests";


const Tab = createBottomTabNavigator();

export default function RootLayout() {
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const [token, setToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>();
    useEffect(() => {
        getAccessToken();
    }, [token]);

    return (
      <Tab.Navigator
          initialRouteName="Index"
          screenOptions={{
            tabBarStyle: {
                backgroundColor: colors.secondaryBackground,
                borderColor: colors.secondaryBackground,
                height: 50,
            },
            tabBarActiveTintColor: colors.primaryPurple,
            tabBarInactiveTintColor: 'white',
          }}
      >
          <Tab.Screen
              name="Index"
              options={{ tabBarLabel: "Main", headerShown: false }}
          >
              {(props) => <Index
                  {...props}
                  token={token}
                  setUser={setUser}
                  setToken={setToken}
                  user={user}
              />}
          </Tab.Screen>
        <Tab.Screen
            name="MoreInfo"
            options={{ tabBarLabel: 'Other Info', headerShown: false }}
        >
            {(props) => <MoreInfo {...props} user={user} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
}
