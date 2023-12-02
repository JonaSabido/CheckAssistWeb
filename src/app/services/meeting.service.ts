import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService, FilterParams, getParams } from 'shared/services/api.service';
import { Meeting, MeetingAttendance } from '../interfaces/meeting.interface';
import { Observable } from 'rxjs';
import { List } from '../interfaces/apiresponses.interface';

@Injectable({
    providedIn: 'root'
})

export class MeetingService extends ApiService<Meeting>{
    constructor(http: HttpClient) {
        super(http);
    }

    public root(): string {
        return 'meetings';
    }

    public availables(params?: FilterParams<Meeting>): Observable<List<Meeting>> {
        return this.http.get<List<Meeting>>(`${this.uri}availables`, { params: getParams(params || {}) });
    }

    public history(params?: FilterParams<Meeting>): Observable<List<Meeting>> {
        return this.http.get<List<Meeting>>(`${this.uri}history`, { params: getParams(params || {}) });
    }

    public attendance(idMeeting: number): Observable<List<MeetingAttendance>> {
        return this.http.get<List<MeetingAttendance>>(`${this.uri}/${idMeeting}/attendance`);
    }

}