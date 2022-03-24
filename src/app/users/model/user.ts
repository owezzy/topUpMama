export interface User {
    isSelected?: boolean;
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar?: string;
    isEdit?: boolean;
    isLoggedIn?: boolean;
    token?: string;

}

export const DefaultUser: User = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    isLoggedIn: false
}

export const UserSchema: any = {
    first_name: "text",
    last_name: "text",
    email: "text",
    avatar: "text",
}
