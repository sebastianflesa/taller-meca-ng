import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { InventarioService } from '../inventario.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @description
 * Componente para restar un producto del inventario.
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
  selector: 'app-inventario-utilizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-utilizar.component.html',
  styleUrl: './inventario-utilizar.component.css'
})


export class InventarioUtilizarComponent implements OnInit {
  producto: any;
  quantity: any;
  id: any;
  max_stock: any;
constructor(private route: ActivatedRoute, private inventarioService: InventarioService, private router: Router) {} 

/** 
* @description
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
          this.id = data.id;
          this.max_stock = data.quantity;
          console.log('Producto cargado:', data);
        } else {
          console.warn('Producto no encontrado');
        }
      },
    });
  }

}

/**
 *  @description
 * Función que se ejecuta al enviar el formulario
 * @returns {void}
 */
onSubmit() {
  console.log('Cantidad a utilizar:', this.producto.quantity);
  this.inventarioService.updateItemQuantity(this.producto.id, this.producto.quantity);
    alert('Stock Actualizado');
    if (this.router) {
      this.router.navigate(['/inventario']);
    }
  }

}
