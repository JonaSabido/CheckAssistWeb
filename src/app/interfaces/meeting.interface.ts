import { Model } from "./model.interface";
import { User } from "./user.interface";

export interface Meeting extends Model {
    id_user: number,
    code_meeting: string,
    name: string,
    description: string
    latitude: number,
    longitude: number,
    date_meeting: string,
    start_hour: string,
    end_hour: string,
    user?: User,
    selectedLocation?: boolean,
}

export interface Attendance {
    last_name: string,
    name: string,
    check_in: string,
    check_out: string,
    status: string,
}

export interface MeetingAttendance {
    meeting: Meeting,
    attendance: Attendance[]
}