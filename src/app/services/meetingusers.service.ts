import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'shared/services/api.service';
import { MeetingUser } from '../interfaces/meetinguser.interface';

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

}