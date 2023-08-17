import { AppUser } from "../types";
declare const createUser: (user: AppUser) => Promise<import("@prisma/client/runtime").GetResult<{
    id: string;
    display_name: string;
    followers_num: string;
    image: string;
    uri: string;
}, unknown> & {}>;
declare const getUsers: () => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    display_name: string;
    followers_num: string;
    image: string;
    uri: string;
}, unknown> & {})[]>;
export { createUser, getUsers };
