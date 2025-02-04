import {Button, Image, StyleSheet, TextInput, View} from "react-native";
import { Text, TouchableOpacity, Linking } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import getUserData from "@/app/get-user-data";


export default function Index() {
    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const [token, setToken] = useState();
    const [user, setUser] = useState();
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
                console.error("Error fetching token:", error.response?.data || error.message);
            }
        }

        if(token) return;
        getAccessToken();
    }, [token]);

    return (
        <>
            <View
                style={styles.container}
            >
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write login"
                />
                <Button
                    onPress={() => getUserData(text)}
                    title="Find by nickname"
                    color="#841584"
                    accessibilityLabel="Find by nickname"
                />
                <Image source={{uri: user?.image.link}}
                       style={styles.userImg} />
                <View>
                    <Text>{user?.last_name}</Text>
                    <Text>{user?.first_name}</Text>
                </View>
                <Text>{user?.email}</Text>
                <Text>{user?.phone}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImg: {
        width: 200,
        height: 200,
    }
});
