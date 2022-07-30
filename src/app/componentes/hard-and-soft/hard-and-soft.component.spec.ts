import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardAndSoftComponent } from './hard-and-soft.component';

describe('HardAndSoftComponent', () => {
  let component: HardAndSoftComponent;
  let fixture: ComponentFixture<HardAndSoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardAndSoftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardAndSoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
