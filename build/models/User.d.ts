import { AppUser } from "../types";
declare const createUser: (user: AppUser) => Promise<{
    id: string;
    display_name: string;
    followers_num: string;
    image: string;
    uri: string;
}>;
declare const getUsers: () => Promise<{
    id: string;
    display_name: string;
    followers_num: string;
    image: string;
    uri: string;
}[]>;
export { createUser, getUsers };
