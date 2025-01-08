import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingOnlineComponent } from './wedding-online.component';

describe('WeddingOnlineComponent', () => {
  let component: WeddingOnlineComponent;
  let fixture: ComponentFixture<WeddingOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
