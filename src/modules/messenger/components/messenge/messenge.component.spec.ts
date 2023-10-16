import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengeComponent } from './messenge.component';

describe('MessengeComponent', () => {
  let component: MessengeComponent;
  let fixture: ComponentFixture<MessengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengeComponent]
    });
    fixture = TestBed.createComponent(MessengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
