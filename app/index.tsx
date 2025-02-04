import {Button, Image, StyleSheet, TextInput, View} from "react-native";
import { Text } from 'react-native';
import {FC, useState} from "react";
import axios, { AxiosError } from "axios";
import {User} from "@/app/types/user";

type IndexProps = {
    user: User | undefined;
    token: string | undefined;
    setUser: (user: User | undefined) => void;
}

export const Index: FC<IndexProps> = ({ user, token, setUser }) => {
    const [text, onChangeText] = useState('');

    async function getUserData(user: string): Promise<User | undefined> {
        if(!token) return;
        try {
            const response = await axios.get(`https://api.intra.42.fr/v2/users/${user}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error fetching cursus data:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
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
                    <Text>{user?.usual_full_name}</Text>
                </View>
                <Text>{user?.email}</Text>
                <Text>{user?.phone}</Text>
                <Text>{user?.wallet}</Text>
                {user?.location ? (<Text>{user?.location}</Text>) : (<Text>Location is unknown</Text>)}
                <Text>{user?.cursus_users[1].level}</Text>
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
