import { View } from "react-native";
import { Text, TouchableOpacity, Linking } from 'react-native';

export default function Index() {
    const openLink = () => {
        Linking.openURL('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-61278f9890185c5835eecf6d23022f43a5834d4520093394814980e9b7ae45b6&redirect_uri=http%3A%2F%2Flocalhost&response_type=code');
    };
    const client_id = process.env.EXPO_PUBLIC_CLIENT_ID;
    const client_secret = process.env.EXPO_PUBLIC_CLIENT_SECRET;
    console.log(client_id);
    console.log(client_secret);
    return (
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
    );
}
