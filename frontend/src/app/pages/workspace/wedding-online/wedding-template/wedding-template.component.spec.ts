import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingTemplateComponent } from './wedding-template.component';

describe('WeddingTemplateComponent', () => {
  let component: WeddingTemplateComponent;
  let fixture: ComponentFixture<WeddingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
