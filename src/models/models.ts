export interface UserLoginType {
  username: string
  password: string
}

export interface PostType {
  owner: string
  text: string
  _id: string
}

export interface UserType {
    email: string
    password: string
    name: string
    city: string
    college: string
    avatar: string
    status: string
    gender: string,
}

export interface UserTypeExt extends UserType{
  _id: string;
  friends: Array<string>,
}
