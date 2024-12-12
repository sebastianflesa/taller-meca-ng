import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-inventario-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario-nuevo.component.html',
  styleUrls: ['./inventario-nuevo.component.css'],
})
export class InventarioNuevoComponent implements OnInit {
  inventarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private router: Router
  ) {
    this.inventarioForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      description: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {
    console.log('Componente InventarioNuevoComponent inicializado.');
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.inventarioForm.valid) {
      const nuevoProducto = this.inventarioForm.value;
      this.inventarioService.addItemToInventario(nuevoProducto);
      alert('Producto agregado');
      console.log('Producto agregado:', nuevoProducto);
      this.router.navigate(['/inventario']);
    } else {
      console.error('Todos los campos son obligatorios y deben ser válidos');
    }
  }

  /**
   * Devuelve un control del formulario para simplificar las validaciones en la plantilla
   */
  get control() {
    return this.inventarioForm.controls;
  }
}
