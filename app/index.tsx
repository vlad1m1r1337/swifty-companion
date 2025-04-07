import { Image, StyleSheet, TextInput, TouchableOpacity, View, Dimensions, ScaledSize} from "react-native";
import { Text } from 'react-native';
import {FC, useEffect, useState} from "react";
import {User} from "@/app/types/user";
import {colors} from "@/app/constants";
import {getUserData} from "@/app/requests";
type IndexProps = {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
}

export const Index: FC<IndexProps> = ({ user, token, setUser, setToken }) => {
    const [text, onChangeText] = useState('');
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setScreenDimensions(window);
        };

        const listener = Dimensions.addEventListener('change', onChange);

        return () => listener.remove();
    }, []);

    const isLandscape = screenDimensions.width > screenDimensions.height;
    const fetchUser = async () => {
        if (!text.length) return
        const userData = await getUserData(text);
        if (userData) {
            setUser(userData);
        }
    };
    console.log(user)
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
                <TouchableOpacity onPress={() => fetchUser()} style={styles.button}>
                    <Text style={styles.buttonText}>Find by nickname</Text>
                </TouchableOpacity>
                {user && (
                        <View style={{...styles.fullInfo, flexDirection: isLandscape ? 'row' : 'column'}}>
                            <Image
                                source={{ uri: user?.image?.link }}
                                style={styles?.userImg}
                            />
                            <View style={styles.info}>
                                <View style={{marginRight: 10}}>
                                    <Text style={styles.infoTag}>Full Name</Text>
                                    <Text style={styles.infoTag}>Level</Text>
                                    <Text style={styles.infoTag}>Email</Text>
                                    <Text style={styles.infoTag}>Phone</Text>
                                    <Text style={styles.infoTag}>Location</Text>
                                    <Text style={styles.infoTag}>Wallet</Text>
                                </View>
                                <View>
                                    <Text style={styles.infoValue}>{user?.usual_full_name}</Text>
                                    <Text style={styles.infoValue}>{user?.cursus_users[1]?.level}</Text>
                                    <Text style={styles.infoValue}>{user?.email}</Text>
                                    <Text style={styles.infoValue}>{user?.phone}</Text>
                                    {user?.location ? (<Text style={styles.infoValue} >{user?.location}</Text>) :
                                        (<Text style={styles.infoValue} >Location is unknown</Text>)}
                                    <Text style={styles.infoValue} >{user?.wallet}</Text>
                                </View>
                            </View>
                        </View>
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
        paddingBottom: 50
    },
    userImg: {
        width: 130,
        height: 130,
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
        elevation: 5,
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
    fullInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
    },
    infoTag: {
        color: 'white',
    },
    infoValue: {
        color: colors.primaryPurple
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    }
});
