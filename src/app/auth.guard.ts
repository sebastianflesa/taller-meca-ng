import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

/**
 * @description
 * Guard that allows access to routes only if the user is authenticated
 */

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Permite el acceso a rutas solo si el usuario está autenticado
   * @returns boolean
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  

}