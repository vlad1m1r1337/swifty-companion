import {Button, Image, StyleSheet, TextInput, View} from "react-native";
import { Text, TouchableOpacity, Linking } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";


export default function Index() {
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [text, onChangeText] = useState('Text');
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
                console.error("Error fetching token:", error.response?.data || error.message);
            }
        }

        if(token) return;
        getAccessToken();
    }, [token]);
    async function getCursusData(user: string) {
        if(!token) return;
        try {
            const response = await axios.get(`https://api.intra.42.fr/v2/users/${user}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching cursus data:", error.response?.data || error.message);
        }
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write login"
                />
                <Button
                    onPress={() => getCursusData(text)}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Text>{user?.login}</Text>
                <Text>{user?.last_name}</Text>
                <Text>{user?.first_name}</Text>
                <Image source={{uri: user?.image.link}}
                       style={{width: 400, height: 400}} />
            </View>
        </>
    );
}
