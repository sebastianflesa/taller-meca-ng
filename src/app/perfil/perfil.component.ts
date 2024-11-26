import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * @description
 * Componente para el perfil de usuario
 */

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {
  /**
   * Funcion que se ejecuta al enviar el formulario
   * @returns {void}
   */
  updatePerfil() {
    if (this.password === this.confpassword) {
      let updatedUser = {
        username: this.username,
        correo: this.correo,
        password: this.password
      }; 
      this.authService.updateUser(updatedUser);
      alert('Perfil actualizado');
      //this.router.navigate(['/login']);
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
  data_user: any;
  username: string = '';
  correo: string = '';
  confpassword: any;
  password: any;
  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Funcion que se ejecuta al iniciar el componente
   * @returns {void}
   */
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }else{
      this.data_user = this.authService.getLoggedUser();
      this.username = this.data_user.username;
      this.correo = this.data_user.correo;
      console.log(this.data_user);
    }
  }

}
