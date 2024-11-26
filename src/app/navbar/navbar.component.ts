import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import {CommonModule} from '@angular/common';

/**
 * @description
 * Componente para la barra de navegación
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) {
  }
  role: any;

  /**
   * Funcion que se ejecuta al iniciar el componente
   * @returns {void}
   */

  ngOnInit() {
    if (this.authService.getUserRole()) {
      this.role = this.authService.getUserRole();
    }

  }
  /**
   * Funcion que se ejecuta al cerrar sesión
   * @returns {void}
   */
  logout() {
    this.authService.logout();
    this.role = this.authService.getUserRole();
    this.router.navigate(['/login']);
    console.log("logout");
  }


}
