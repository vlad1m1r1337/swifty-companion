import { View } from "react-native";
import { Text, TouchableOpacity, Linking } from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";


export default function Index() {

    const UID = process.env.EXPO_PUBLIC_CLIENT_ID;
    const SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    const [token, setToken] = useState()
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
                console.log("Access Token:", response.data.access_token);
                return response.data.access_token;
            } catch (error) {
                console.error("Error fetching token:", error.response?.data || error.message);
            }
        }

        getAccessToken();
    }, []);
    useEffect(() => {
        async function getCursusData() {
            if(!token) return;
            try {
                const response = await axios.get("https://api.intra.42.fr/v2/users/vgribkov", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Cursus Data:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error fetching cursus data:", error.response?.data || error.message);
            }
        }

        getCursusData();
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
            </View>
            <View>
                {/*<Text>{user?.login}</Text>*/}
                {/*<Text>{user?.email}</Text>*/}
                {/*<Text>{user?.phone}</Text>*/}
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