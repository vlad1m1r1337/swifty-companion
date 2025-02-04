import {Button, Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import { Text } from 'react-native';
import {FC, useState} from "react";
import axios, { AxiosError } from "axios";
import {User} from "@/app/types/user";
import {colors} from "@/app/constants";

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
                    placeholderTextColor={colors.primaryPurple}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => getUserData(text)} style={styles.button}>
                    <Text style={styles.buttonText}>Find by nickname</Text>
                </TouchableOpacity>
                {user && (
                    <>
                        <Image
                            source={{ uri: user.image.link }}
                            style={styles.userImg}
                        />
                        {/*<View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Full Name</Text>*/}
                        {/*        <Text>{user.usual_full_name}</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Level</Text>*/}
                        {/*        <Text>{user?.cursus_users[1].level}</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Email</Text>*/}
                        {/*        <Text>{user.email}</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Phone</Text>*/}
                        {/*        <Text>{user.phone}</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Location</Text>*/}
                        {/*        {user?.location ? (<Text>{user?.location}</Text>) : (<Text>Location is unknown</Text>)}*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.infoRow}>*/}
                        {/*        <Text>Wallet</Text>*/}
                        {/*        <Text>{user?.wallet}</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        <View style={{display: 'flex', flexDirection: 'row', width: '200'}}>
                            <View>
                                <Text>{user.usual_full_name}</Text>
                                <Text>{user.cursus_users[1].level}</Text>
                                <Text>{user.email}</Text>
                                <Text>{user.phone}</Text>
                                {user?.location ? (<Text>{user?.location}</Text>) : (<Text>Location is unknown</Text>)}
                                <Text>{user.wallet}</Text>
                            </View>
                            <View>
                                <Text>Full Name</Text>
                                <Text>Level</Text>
                                <Text>Email</Text>
                                <Text>Phone</Text>
                                <Text>Location</Text>
                                <Text>Wallet</Text>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    userImg: {
        width: 200,
        height: 200,
        borderRadius: 20,
        borderColor: colors.primaryPurple,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 15,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 10,
    },
    input: {
        color: colors.primaryPurple,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Тень на Android
    },
    button: {
        backgroundColor: colors.primaryPurple,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    }
});
