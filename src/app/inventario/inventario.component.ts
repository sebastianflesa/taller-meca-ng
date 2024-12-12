import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../inventario.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description
 * Componente Inventario
 * Este componente se encarga de mostrar el inventario del taller
 * 
 */

@Component({
  selector: 'app-inventario',
  standalone: true,
  providers: [],
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})

export class InventarioComponent implements OnInit {


  /**
   * @param {number} id 
   * Función que redirige a la página para utilizar un item del inventario
   * 
   */
  buttonUtilizar(id: number) {
    this.router.navigate(['/inventario/utilizar', id]);
  }


  constructor(private inventarioService: InventarioService, private router: Router, private authService: AuthService) {

  }
  inventario: any;
  user_role: any;
  loading: boolean = true;
  
  /**
   * @param {number} id 
   * @returns {void}
   * Función que redirige a la página para editar un item del inventario
   * 
   */

  buttonEdit(id: number) {
    //redirigir a inventario/id
    this.router.navigate(['/inventario', id]);
    
  }

  getDatosInventario() {
    this.inventarioService.getJsonData().subscribe(
      data => {
        this.inventario = data;
        this.loading = false;
      },
      error => {
        console.error('Error al obtener el inventario', error);
      }
    );
  }

  /**
   * funcion que se ejecuta al iniciar el componente hace un get al bucket de inventario
   * @returns {void}
   */
  ngOnInit() {

    this.getDatosInventario();

    /*
    this.inventarioService.inventario$.subscribe({
      next: (data) => {
        console.log(data)
        this.inventario = data;
      },
      error: (error) => {
        console.error('Error al obtener el inventario', error);
      },
      complete: () => {
        console.log('Suscripción completada');
      }
    });
    */

    this.user_role = this.authService.getUserRole();
    console.log(this.user_role);
  }
  /**
   * Función que obtiene el inventario del taller
   * @returns {void}
   */
  obtenerInventario() {
    this.inventario = this.inventarioService.getInventario();
    console.log(this.inventario);
  }

  nuevoProducto = {
    name: "Líquido refrigerante",
    category: "Insumos",
    quantity: 25,
    price: "8000",
    description: "Marca CoolMax"
  };
  
  /**
   * Función que agrega un item al inventario
   * @returns {void}
   */
  buttonAdd() {
    this.inventarioService.addItemToInventario(this.nuevoProducto);

  }

  /**
   * 
   * @param id 
   * Función que borra un item del inventario
   * @returns {void}
   */
  buttonBorrar(id: number) {
    if(confirm("¿Estás seguro de que deseas eliminar este item?")) {
      this.inventarioService.deleteItemFromInventario(id);
      console.log('borrar' + id);
      this.getDatosInventario();
    }
    
  }
  /**
   * Función que redirige a la página para agregar un nuevo item al inventario
   * @returns {void}
   */
  navigateToNuevo() {
    this.router.navigate(['/inventario/nuevo']);
  }

  
}
