import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { InventarioService } from '../inventario.service';
import { Router } from '@angular/router';

/**
 * @description
 * Componente para crear un nuevo producto en el inventario.
 * 
 */
@Component({
  selector: 'app-inventario-nuevo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inventario-nuevo.component.html',
  styleUrls: ['./inventario-nuevo.component.css'] // Cambiado a styleUrls
})

export class InventarioNuevoComponent implements OnInit {
  name: string = '';
  category: string = '';
  quantity: number | null = null;
  price: number | null = null;
  description: string = '';
  nuevoProducto: any;

  constructor(private inventarioService: InventarioService,private router: Router ) { }
  /**
   * Función que se ejecuta al iniciar el componente
   * @returns {void}
   */
  ngOnInit(): void {
    console.log('Componente InventarioNuevoComponent inicializado.');
  }
  /**
   * Función que se ejecuta al enviar el formulario
   * @returns {void}
   */
  onSubmit() {
    if (this.name && this.category && this.quantity && this.price && this.description) {
      this.nuevoProducto = {
        name: this.name,
        category: this.category,
        quantity: this.quantity,
        price: this.price,
        description: this.description
      };
      this.inventarioService.addItemToInventario(this.nuevoProducto);
      alert('Producto agregado');
      console.log('Producto agregado:', this.nuevoProducto);
      this.router.navigate(['/inventario']);
      
    } else {
      console.error('Todos los campos son obligatorios');
    }
  }
}
