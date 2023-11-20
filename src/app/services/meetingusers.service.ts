import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { MeetingUser } from '../interfaces/meetinguser.interface';
import { List } from '../interfaces/apiresponses.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MeetingUserService extends ApiService<MeetingUser>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'meetingsusers';
    }

    public getByMeeting(idMeeting: number): Observable<List<MeetingUser>> {
        return this.http.get<List<MeetingUser>>(`${this.uri}/bymeeting/${idMeeting}`);
    }

}