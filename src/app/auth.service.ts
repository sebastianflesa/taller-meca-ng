import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @description
 * Servicio que permite la autenticación de usuarios
 */

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router) {
    if (this.isLocalStorageAvailable() && !localStorage.getItem('inventario')) {
      this.setUusuariosDefault(this.usuarios);
    }
  }


  private readonly validUsername = 'admin';
  private readonly validPassword = 'admin';

  usuarios = [
    {username: 'admin', password: 'admin', name: 'Admin'},
    {username: 'mecanico', password: 'mecanico', name: 'Mecanico'}
  ];

  /**
   * Permite el inicio de sesión de un usuario
   * @param {string} username 
   * @param {string} password 
   * @returns {boolean}
   */

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('rol', 'admin');
      localStorage.setItem("user_session", JSON.stringify({username: 'admin', loggedIn: true, name: 'Admin', correo: 'admin@taller.com'}));

      return true;
    } else if (username === 'mecanico' && password === 'mecanico') {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('rol', 'mec');
      localStorage.setItem("user_session", JSON.stringify({username: 'mecanico', loggedIn: true, name: 'Mecanico', correo: 'mec@taller.com'}));

      return true;
    }else{
      let usuarios = this.getUsuarios();
      let usuario = usuarios.find((u: any) => u.username === username && u.password === password);
      console.log(usuarios);
      if(usuario){
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('rol', 'mec');
        localStorage.setItem("user_session", JSON.stringify({username: usuario.username, loggedIn: true, name: usuario.name, correo: usuario.correo}));
        return true;
      }else{
        return false;
      }
    }
  }
  /**
   * Funcion que verifica si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined' || localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Funcion que cierra la sesión del usuario
   * @returns {void}
   */
  logout() {
    localStorage.removeItem("user_session");
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
  }

  /**
   * Funcion que obtiene el rol del usuario
   * @returns {string | bolean}
   */
  getUserRole() {
    if (typeof localStorage === 'undefined' || localStorage.getItem('token') === null) {
      return false;
    } else {
      return localStorage.getItem('rol');
    }
  }
  /**
   * Funcion que obtiene el usuario logueado
   * @returns {JSON | bolean}
   */

  getLoggedUser() {
    if (typeof localStorage === 'undefined' || localStorage.getItem('token') === null) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('user_session') || '[]');
    }
  }

  /**
   * Permite verificar si el LocalStorage está disponible
   * @returns {boolean}
   */

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Permite establecer los usuarios por defecto
   * @param JSON usuarios
   */
  setUusuariosDefault(usuarios: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }
  /**
   * Funcion que permite guardar un usuario
   * @param void 
   */
  saveUsuario(usuario: any) {
    if (this.isLocalStorageAvailable()) {
      let currentUsuarios = this.getUsuarios();
      if (!Array.isArray(currentUsuarios)) {
        currentUsuarios = [];
      }
      currentUsuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(currentUsuarios));
    } else {
      console.error("LocalStorage no está disponible.");
    }
  }
  /**
   * Funcion que obtiene los usuarios
   * @returns {JSON}
   */
  getUsuarios() {
    if (this.isLocalStorageAvailable() && localStorage.getItem('usuarios')) {
      return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }
    return this.usuarios;
  }
  /**
   * Funcion que permite actualizar un usuario
   * @param {JSON} updatedUser
   * @returns {void}
   * */
  updateUser(updatedUser: any) {
    if (this.isLocalStorageAvailable()) {
      let currentUsuarios = this.getUsuarios();
      if (!Array.isArray(currentUsuarios)) {
        currentUsuarios = [];
      }
      const index = currentUsuarios.findIndex((item: any) => item.username === updatedUser.username);
      
      if (index !== -1) {
        currentUsuarios[index] = { ...currentUsuarios[index], ...updatedUser };
        localStorage.setItem('usuarios', JSON.stringify(currentUsuarios));
        console.log(`Elemento con ID ${updatedUser.username} actualizado.`);
        this.logout();
        this.router.navigate(['/login']);
        console.log("logout");
      } else {
        console.log(`Elemento con ID ${updatedUser.username} no encontrado.`);
      }
    } else {
      console.log("LocalStorage no está disponible.");
    }
  }




}


