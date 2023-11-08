import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMeetingComponent } from './detail-meeting.component';

describe('DetailMeetingComponent', () => {
  let component: DetailMeetingComponent;
  let fixture: ComponentFixture<DetailMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMeetingComponent]
    });
    fixture = TestBed.createComponent(DetailMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
