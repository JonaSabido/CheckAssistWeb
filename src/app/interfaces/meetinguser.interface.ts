import { Meeting } from "./meeting.interface";
import { Model } from "./model.interface";
import { User } from "./user.interface";

export interface MeetingUser extends Model {
    id_user: number,
    id_meeting: number,
    meeting?: Meeting,
    user?: User
}