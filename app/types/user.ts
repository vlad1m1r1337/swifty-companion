import names from "ajv/lib/compile/names";

export interface User {
    id: number;
    email: string;
    login: string;
    usual_full_name: string;
    phone: string;
    wallet: number;
    location: string | null
    cursus_users: Array<{
        level: number;
        skills: { name: string; level: number }[];
    }>,
    projects_users: Array<{
        final_mark: number;
        status: string;
        project: {
            name: string;
        }
    }>,
    image: {
        link: string;
    }
}