import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { InventarioService } from '../inventario.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @description
 * Componente para editar un producto del inventario.
 */



interface InventarioItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: string;
  description: string;
}



@Component({
  selector: 'app-inventario-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-editar.component.html',
  styleUrl: './inventario-editar.component.css'
})
export class InventarioEditarComponent implements OnInit {
  


  constructor(
    private route: ActivatedRoute,
    private inventarioService: InventarioService,
    private router: Router
  ) {}

  id!: number;
  producto!: InventarioItem;
  /**
   * Función que se ejecuta al iniciar el componente
   * @returns {void}
   */
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.inventarioService.getItemById(idParam).subscribe({
        next: (data: InventarioItem | undefined) => {
          if (data) {
            this.producto = data;
            //No funciona 
            //this.producto.category = data.category;
            //Si funciona
            //this.producto.category = 'Insumo';
            //console.log('Producto cargado:', data.category);
          } else {
            console.error('Producto no encontrado.');
            this.router.navigate(['/inventario']);
          }
        },
        error: (error: any) => {
          console.error('Error al cargar el producto:', error);
          this.router.navigate(['/inventario']);
        }
      });
    } else {
      console.error('ID inválido en la URL.');
      this.router.navigate(['/inventario']);
    }
  }
  /**
   * Función que se ejecuta al enviar el formulario
   * @returns {void}
   */
  onSubmit() {
    if (this.producto) {
      this.inventarioService.updateItem(this.producto);
      console.log('Producto actualizado:', this.id);
      this.router.navigate(['/inventario']);
    } else {
      console.error('Producto no encontrado.');
      this.router.navigate(['/inventario']);
    }
  }
  

}
