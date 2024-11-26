import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
/**
 * @description
 * Guard que permite el acceso a rutas solo si el usuario no está autenticado
 */
@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * 
   * @param route 
   * @param state 
   * @returns boolean
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inventario']);
      return false;
    }
    return true;
  }
}