import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioNuevoComponent } from './inventario-nuevo.component';
import { InventarioService } from '../inventario.service';

describe('InventarioNuevoComponent', () => {
  let component: InventarioNuevoComponent;
  let fixture: ComponentFixture<InventarioNuevoComponent>;
  let mockInventarioService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockInventarioService = {
      addItemToInventario: jasmine.createSpy('addItemToInventario'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [InventarioNuevoComponent, ReactiveFormsModule],
      providers: [
        { provide: InventarioService, useValue: mockInventarioService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('deberia marcar como invalido si algun campo obligatorio esta vacio', () => {
    component.inventarioForm.setValue({
      name: '',
      category: '',
      quantity: null,
      price: null,
      description: '',
    });

    expect(component.inventarioForm.valid).toBeFalse();
    expect(component.inventarioForm.get('name')?.errors?.['required']).toBeTrue();
    expect(component.inventarioForm.get('category')?.errors?.['required']).toBeTrue();
    expect(component.inventarioForm.get('quantity')?.errors?.['required']).toBeTrue();
    expect(component.inventarioForm.get('price')?.errors?.['required']).toBeTrue();
    expect(component.inventarioForm.get('description')?.errors?.['required']).toBeTrue();
  });

  it('deberia llamar a addItemToInventario y redirigir si el formulario es valido', () => {
    component.inventarioForm.setValue({
      name: 'Producto Test',
      category: 'insumo',
      quantity: 10,
      price: 100,
      description: 'Prueba',
    });

    component.onSubmit();

    expect(mockInventarioService.addItemToInventario).toHaveBeenCalledWith({
      name: 'Producto Test',
      category: 'insumo',
      quantity: 10,
      price: 100,
      description: 'Prueba',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inventario']);
  });

});
