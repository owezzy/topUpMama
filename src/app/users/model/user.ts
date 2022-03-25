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

export const UserSchema:any = {
  isSelected: 'isSelected',
  first_name: "text",
  last_name: "text",
  email: "text",
  avatar: "text",
  name: "text",
  job_title: "text",
  isEdit: 'isEdit'

}

export interface userDetails {
  name: string;
  job_title: string;
}

export class Employee {
  photo!: string;
  name!: string;
  email!: string;
  address!: string;
  dob!: string;
  gender!: string;
}
