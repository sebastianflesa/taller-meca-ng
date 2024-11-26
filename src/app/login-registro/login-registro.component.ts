import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description
 * Componente para el registro de usuarios
 */

@Component({
  selector: 'app-login-registro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-registro.component.html',
  styleUrl: './login-registro.component.css'
})
export class LoginRegistroComponent {
  perfil: any;
  nombre: string = '';
  correo: any;
  password: any;
  confpassword: any;
  username: any;  
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.maxLength(15)]],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  /**
   * Funcion verifica si las contraseñas coinciden
   * @returns {void}
   * */
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  /**
   * Funcion que se ejecuta al enviar el formulario
   * @returns {void}
   */
  registrarse() {
    if (this.registerForm.valid) {
      let newUsuario = {
        username: this.registerForm.get('username')?.value,
        correo: this.registerForm.get('correo')?.value,
        password: this.registerForm.get('password')?.value,
      }; 
      this.authService.saveUsuario(newUsuario);
      this.router.navigate(['/login']);
      alert('Usuario registrado');
    } else {
      alert('Las contraseñas no coinciden');
  }
}
 

}
