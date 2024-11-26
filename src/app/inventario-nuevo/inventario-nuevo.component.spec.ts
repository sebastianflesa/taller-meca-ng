import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioNuevoComponent } from './inventario-nuevo.component';

describe('InventarioNuevoComponent', () => {
  let component: InventarioNuevoComponent;
  let fixture: ComponentFixture<InventarioNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
