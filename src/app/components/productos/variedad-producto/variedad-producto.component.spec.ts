import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariedadProductoComponent } from './variedad-producto.component';

describe('VariedadProductoComponent', () => {
  let component: VariedadProductoComponent;
  let fixture: ComponentFixture<VariedadProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariedadProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariedadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
