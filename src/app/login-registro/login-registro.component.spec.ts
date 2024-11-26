import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegistroComponent } from './login-registro.component';
import { AuthService } from '../auth.service';

describe('LoginRegistroComponent', () => {
  let component: LoginRegistroComponent;
  let fixture: ComponentFixture<LoginRegistroComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuthService = {
      saveUsuario: jasmine.createSpy('saveUsuario')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginRegistroComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia marcar como invalido si las contraseñas no coinciden', () => {
    component.registerForm.setValue({
      username: 'asdasd',
      correo: 'asdasd@asdasd.com',
      password: '123123',
      confirmPassword: '321321'
    });

    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.errors).toEqual({ passwordMismatch: true });
  });

  it('deberia marcar el formulario como valido si todos los campos obligatorios están completos', () => {
    component.registerForm.setValue({
      username: 'testuser',
      correo: 'testuser@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });
    expect(component.registerForm.valid).toBeTrue();
    expect(component.registerForm.get('username')?.errors).toBeNull();
    expect(component.registerForm.get('correo')?.errors).toBeNull();
    expect(component.registerForm.get('password')?.errors).toBeNull();
    expect(component.registerForm.get('confirmPassword')?.errors).toBeNull();
  });

  it('deberia mostrar una alerta si el formulario es invalido', () => {
    spyOn(window, 'alert');

    component.registerForm.setValue({
      username: 'testuser',
      correo: 'test@example.com',
      password: 'password123',
      confirmPassword: 'differentPassword'
    });

    component.registrarse();

    expect(mockAuthService.saveUsuario).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });

  it('deberia marcar el formulario como invalido si faltan campos obligatorios', () => {
    component.registerForm.setValue({
      username: '',
      correo: '',
      password: '',
      confirmPassword: ''
    });

    expect(component.registerForm.valid).toBeFalse();
    expect(component.registerForm.get('username')?.errors?.['required']).toBeTrue();
    expect(component.registerForm.get('correo')?.errors?.['required']).toBeTrue();
    expect(component.registerForm.get('password')?.errors?.['required']).toBeTrue();
    expect(component.registerForm.get('confirmPassword')?.errors?.['required']).toBeTrue();
  });
});
