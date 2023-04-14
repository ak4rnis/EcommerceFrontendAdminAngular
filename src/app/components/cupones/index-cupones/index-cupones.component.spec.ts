import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCuponesComponent } from './index-cupones.component';

describe('IndexCuponesComponent', () => {
  let component: IndexCuponesComponent;
  let fixture: ComponentFixture<IndexCuponesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCuponesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
