import {View, Text, StyleSheet, ScrollView, useWindowDimensions} from "react-native";
import {FC} from "react";
import {User} from "@/app/types/user";
import { Dimensions } from 'react-native';
import {colors} from "@/app/constants";
import {Checkmark} from "@/app/assets/Checkmark";
import {Fail} from "@/app/assets/Fail";

type MoreInfoProps = {
    user: User | null;
}

export const MoreInfo: FC<MoreInfoProps> = ({user}) => {
    const { width, height } = useWindowDimensions();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user ? (
                <View style={{display: 'flex', gap: 10, backgroundColor: colors.primaryBackground, width: Dimensions.get('window').width * 0.75}}>
                    <>
                        <Text style={{color: colors.primaryPurple}} >Skills</Text>
                        {user.cursus_users.at(1)?.skills?.map((skill, index) => (
                            <View style={styles.skillInfo} key={skill.name}>
                                <Text style={styles.name} >{skill.name}</Text>
                                <Text>{(skill.level * 5).toFixed(2)}%</Text>
                            </View>
                        ))}
                        <View
                            style={{
                                borderBottomColor: colors.primaryPurple,
                                borderBottomWidth: 2,
                            }}
                        />
                        <Text style={{color: colors.primaryPurple}} >Projects</Text>
                        {user.projects_users.filter(el => el.status === "finished").map((project, index) => (
                            <View style={styles.projectRow} key={project.project.name}>
                                <Text style={styles.name} >{project.project.name}</Text>
                                <Text style={styles.mark} >{project.final_mark}</Text>
                                { project.final_mark ? <Checkmark/> : <Fail/>}
                            </View>
                        ))}
                    </>
                </View>
            ) : (
                <View style={{ flex: 1, backgroundColor: colors.primaryBackground, height: height }} />
                )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primaryBackground,
        gap:10,
        paddingTop: 20,
        paddingBottom: 60
    },
    skillInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        borderColor: colors.primaryPurple,
        borderWidth: 2,
        borderRadius: 10,
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
    },
    skillContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width * 0.45,
        gap: 10
    },
    projectRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderWidth: 2,
        borderRadius: 10,
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
        borderColor: colors.primaryPurple
    },
    name: {
        color: colors.primaryPurple
    },
    mark: {
        color: 'black'
    }
});
