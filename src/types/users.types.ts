export interface GetUserByEmail {
  email: string;
}

export interface CreateUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
