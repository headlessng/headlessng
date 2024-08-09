import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitivesComponent } from './primitives.component';

describe('PrimitivesComponent', () => {
  let component: PrimitivesComponent;
  let fixture: ComponentFixture<PrimitivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitivesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
