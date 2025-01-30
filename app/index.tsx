import { View } from "react-native";
import { Text, TouchableOpacity, Linking } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Index() {
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const openLink = () => {
        Linking.openURL('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-804f63516c5607775b597ed31ec614b4e48ab5861242432e3a31d7056409cc7c&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2F&response_type=code');
    };
    const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
    const client_secret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code) return;
        const fetchToken = async () => {
            try {
                const formData = new URLSearchParams();
                formData.append("grant_type", "authorization_code");
                formData.append("client_id", client_id || '');
                formData.append("client_secret", client_secret || '');
                formData.append("code", code || "");
                formData.append("redirect_uri", "http://localhost:8081/");

                const res = await axios.post("https://api.intra.42.fr/oauth/token", formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });

                console.log(res.data.access_token);
                setToken(res.data.access_token);
            } catch (e) {
                console.error("Ошибка при получении токена:", e);
            }
        };
        fetchToken();

    }, []);
    useEffect(() => {
        if(token) {
            const fetchMe = async () => {
                try {
                    const res = await axios.get("https://api.intra.42.fr/v2/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log(res.data);
                    setUser(res.data);
                } catch (e) {
                    console.error("Ошибка при получении токена:", e);
                }
            }

            fetchMe();
        }
    }, [token]);
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Edit app/index.tsx to edit this screen.</Text>
                <TouchableOpacity onPress={openLink}>
                    <Text style={{ color: 'blue' }}>Registr</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>{user?.login}</Text>
                <Text>{user?.email}</Text>
                <Text>{user?.phone}</Text>
            </View>
        </>
    );
}


/*

curl -F grant_type=authorization_code \
-F client_id=u-s4t2ud-804f63516c5607775b597ed31ec614b4e48ab5861242432e3a31d7056409cc7c \
-F client_secret=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 \
-F code=aae60cb6c3bfb170f08e73058b7b71ff43c8155b27d0548446aac3721d0527a9 \
-F redirect_uri=http://localhost:8081/ \
-X POST https://api.intra.42.fr/oauth/token


curl -H "Authorization: Bearer a6b68003e92074a5678bda97d19f845f3ea9853f6fa5f93b28d3f031ebbc1617" https://api.intra.42.fr/v2/me

 */