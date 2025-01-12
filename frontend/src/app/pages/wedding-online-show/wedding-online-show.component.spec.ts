import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingOnlineShowComponent } from './wedding-online-show.component';

describe('WeddingOnlineShowComponent', () => {
  let component: WeddingOnlineShowComponent;
  let fixture: ComponentFixture<WeddingOnlineShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingOnlineShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingOnlineShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
