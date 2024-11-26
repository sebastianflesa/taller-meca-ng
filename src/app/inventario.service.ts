import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
/**
 * @description
 * Servicio que maneja el inventario del taller
 */
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private inventarioSubject = new BehaviorSubject<any[]>([]);
  inventario$ = this.inventarioSubject.asObservable();

  inventario = [
    {
      id: 1,
      name: "Filtro de aceite",
      category: "Repuestos",
      quantity: 50,
      price: "10000",
      description: "Marca Chanchito feliz"
    },
    {
      id: 2,
      name: "Pastillas de freno",
      category: "Repuestos",
      quantity: 30,
      price: "20000",
      description: "Marca GTX"
    },
    {
      id: 3,
      name: "Aceite sintético",
      category: "Insumos",
      quantity: 100,
      price: "15000",
      description: "Castrol Edge 5w30"
    },
    {
      id: 4,
      name: "Paño de tela",
      category: "Insumos",
      quantity: 45,
      price: "500",
      description: "Marca generica"
    }
  ];

  constructor() {
    if (this.isLocalStorageAvailable() && !localStorage.getItem('inventario')) {
      this.setInventarioDefault(this.inventario);
    }
    this.loadInventario();
  }
  /**
   * Función que carga el inventario del taller
   * @returns {void}
   */
  private loadInventario() {
    const storedInventario = this.getInventario();
    this.inventarioSubject.next(storedInventario);
  }

  /**
   * Función que obtiene el inventario del taller
   * @returns {any[]}
   */

  getInventario() {
    if (this.isLocalStorageAvailable() && localStorage.getItem('inventario')) {
      return JSON.parse(localStorage.getItem('inventario') || '[]');
    }
    return this.inventario;
  }

  /**
   * Función que establece el inventario por defecto
   * @param {any} inventario
   * @returns {void}
   */
  setInventarioDefault(inventario: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('inventario', JSON.stringify(inventario));
    }
  }

  /**
   * Función que agrega un item al inventario
   * @param newItem 
   * @returns {void}
   */
  addItemToInventario(newItem: any) {
    if (this.isLocalStorageAvailable()) {
      let currentInventario = this.getInventario();
      if (!Array.isArray(currentInventario)) {
        currentInventario = [];
      }
  
      let newId = 1;
      if (currentInventario.length > 0) {
        const lastItem = currentInventario[currentInventario.length - 1];
        newId = lastItem.id + 1;
      }
  
      newItem.id = newId;
      currentInventario.push(newItem);
      localStorage.setItem('inventario', JSON.stringify(currentInventario));
      this.inventarioSubject.next(currentInventario);
    } else {
      console.error("LocalStorage no está disponible.");
    }
  }
  /**
   * funcion que elimina un item del inventario
   * @param id 
   * @returns {void}
   */
  deleteItemFromInventario(id: number) {
    if (this.isLocalStorageAvailable()) {
      let currentInventario = this.getInventario();
      if (!Array.isArray(currentInventario)) {
        currentInventario = [];
      }
      currentInventario = currentInventario.filter((item: any) => item.id !== id);
      localStorage.setItem('inventario', JSON.stringify(currentInventario));
      this.loadInventario();
    } else {
      console.error("LocalStorage no está disponible.");
    }
  }
  /**
   * Función que actualiza un item del inventario
   * @param updatedItem 
   * @returns {void}
   */

  updateItem(updatedItem: any) {
    if (this.isLocalStorageAvailable()) {
      let currentInventario = this.getInventario();
      if (!Array.isArray(currentInventario)) {
        currentInventario = [];
      }

      const index = currentInventario.findIndex((item: any) => item.id === updatedItem.id);
      

      if (index !== -1) {
        currentInventario[index] = { ...currentInventario[index], ...updatedItem };
        localStorage.setItem('inventario', JSON.stringify(currentInventario));
        this.inventarioSubject.next(currentInventario);
      } else {
        console.error(`Elemento con ID ${updatedItem.id} no encontrado.`);
      }
    } else {
      console.error("LocalStorage no está disponible.");
    }
  }
  /**
   * Función que obtiene un item del inventario por ID
   * @param id 
   * @returns {any}
   */
  getItemById(id: string) {
    interface InventarioItem {
      id: number;
      name: string;
      category: string;
      quantity: number;
      price: string;
      description: string;
    }
    const currentInventario: InventarioItem[] = this.getInventario();
    const itemEncontrado = currentInventario.find((item: InventarioItem) => item.id === Number(id));
    return of(itemEncontrado)
  }
  /**
   * Función que verifica si localStorage está disponible
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
   * Función que actualiza la cantidad de un item del inventario
   * @param id 
   * @param quantity 
   * @returns {void}
   */
  updateItemQuantity(id: number, quantity: number) {
    if (this.isLocalStorageAvailable()) {
      let currentInventario = this.getInventario();
      if (!Array.isArray(currentInventario)) {
        currentInventario = [];
      }

      const index = currentInventario.findIndex((item: any) => item.id === id);
      
      if (index !== -1) {
        currentInventario[index].quantity = quantity;
        localStorage.setItem('inventario', JSON.stringify(currentInventario));
        this.inventarioSubject.next(currentInventario);
      } else {
        console.error(`Elemento con ID ${id} no encontrado.`);
      }
    } else {
      console.error("LocalStorage no está disponible.");
    }
  }
}
