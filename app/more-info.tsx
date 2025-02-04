import { View, Text } from "react-native";
import {FC} from "react";
import {User} from "@/app/types/user";

type MoreInfoProps = {
    user: User | undefined;
}

export const MoreInfo: FC<MoreInfoProps> = ({user}) => {

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                {user?.cursus_users.at(1)?.skills?.map((skill, index) => (
                    <Text key={skill.name}>{index} {skill.name}: {(skill.level * 5).toFixed(2)}%</Text>
                ))}
            </View>
            <View>
                {user?.projects_users.filter(el => el.status === "finished").map((project, index) => (
                    <Text key={project.project.name}>{index} {project.project.name}: {project.final_mark}</Text>
                ))}
            </View>
        </View>
    )
}
