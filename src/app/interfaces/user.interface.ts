import { Model } from "./model.interface";
import { Profile } from "./profile.interface";

export interface User extends Model {
    name: string,
    last_name: string,
    id_profile: number
    email: string,
    password: string,
    profile?: Profile
}