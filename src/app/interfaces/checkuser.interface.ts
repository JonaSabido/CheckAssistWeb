import { MeetingUser } from "./meetinguser.interface";
import { Model } from "./model.interface";

export interface CheckUser extends Model {
    id_meeting_user: number,
    start_date: string,
    end_date?: string,
    status: string,
    start_image: string,
    end_image?: string,
    meeting_user?: MeetingUser
}