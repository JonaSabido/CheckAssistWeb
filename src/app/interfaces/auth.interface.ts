export interface LoginSuccess {
    message: string,
    token: string
}


export interface LoginPayload {
    email: string,
    password: string
}

export interface RegisterPayload {
    name: string,
    last_name: string,
    email: string,
    password: string
}

export interface AuthUser {
    id: number,
    id_profile: number,
    name: string,
    last_name: string
}