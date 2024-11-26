import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioUtilizarComponent } from './inventario-utilizar.component';

describe('InventarioUtilizarComponent', () => {
  let component: InventarioUtilizarComponent;
  let fixture: ComponentFixture<InventarioUtilizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioUtilizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioUtilizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
