import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMeetingsComponent } from './history-meetings.component';

describe('HistoryMeetingsComponent', () => {
  let component: HistoryMeetingsComponent;
  let fixture: ComponentFixture<HistoryMeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryMeetingsComponent]
    });
    fixture = TestBed.createComponent(HistoryMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
