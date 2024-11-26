import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, FormGroup,FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
/**
 * @description
 * Componente que permite el inicio de sesión de un usuario
 */


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: any;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  /**
   * Funcion que se ejecuta al iniciar el componente
   * @returns {void}
   */

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inventario']);
    }
  }
 /**
   * Funcion que se ejecuta al enviar el formulario
   * @returns {void}
   */

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.get('username')?.value);
      if (this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)) {
        const role = this.authService.getUserRole();
        if (role === 'admin') {
          this.router.navigate(['/inventario']);
        } else if (role === 'mec') {
          this.router.navigate(['/inventario']);
        }
        this.role = this.authService.getUserRole();
        
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      console.log('Todos los campos son obligatorios');
    }
    
  }

  get formularioControls() {
    return this.loginForm.controls;
  }

}
