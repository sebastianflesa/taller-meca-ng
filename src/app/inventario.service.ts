import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { catchError, map } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyBQMp9Jf3xcssORoEwvlsqawecuSh7Or4Q",
  authDomain: "taller-meca-bfcbe.firebaseapp.com",
  projectId: "taller-meca-bfcbe",
  storageBucket: "taller-meca-bfcbe.firebasestorage.app",
  messagingSenderId: "641461907938",
  appId: "1:641461907938:web:8272688ebfa374ad9849bb",
  measurementId: "G-GD1SH7T4NK"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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

  private url_inventario = "https://firebasestorage.googleapis.com/v0/b/taller-meca-bfcbe.firebasestorage.app/o/inventario.json?alt=media&token=3dd97bd9-3b03-470b-b8a2-87b681388cf9";

  
  inventario = [  ];

  constructor(private http: HttpClient) {
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

  getJsonData(): Observable<any> {
    return this.http.get(this.url_inventario);
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
 
addItemToInventario(newItem: any): void {
  if (this.isLocalStorageAvailable()) {
    try {
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
      this.actualizarArchivoEnBucket(currentInventario);
      console.log("Elemento añadido correctamente al inventario.");
    } catch (error) {
      console.log("Error al añadir un elemento al inventario:", error);
    }
  } else {
    console.log("LocalStorage no está disponible.");
  }
}
  /**
   * funcion que elimina un item del inventario
   * @param id 
   * @returns {void}
   */
  deleteItemFromInventario(id: number): void {
    if (this.isLocalStorageAvailable()) {
      try {
        let currentInventario = this.getInventario();
        if (!Array.isArray(currentInventario)) {
          currentInventario = [];
        }
        currentInventario = currentInventario.filter((item: any) => item.id !== id);
        localStorage.setItem('inventario', JSON.stringify(currentInventario));
        this.inventarioSubject.next(currentInventario);
        this.actualizarArchivoEnBucket(currentInventario);
        console.log(`Elemento con ID ${id} eliminado correctamente.`);
      } catch (error) {
        console.log("Error al eliminar el elemento del inventario:", error);
      }
    } else {
      console.log("LocalStorage no está disponible.");
    }
  }
  /**
   * Función que actualiza un item del inventario
   * @param updatedItem 
   * @returns {void}
   */

  updateItem(updatedItem: any): void {
    if (!updatedItem || typeof updatedItem.id === "undefined") {
      console.error("El elemento actualizado debe tener un ID válido.");
      return;
    }
  
    if (this.isLocalStorageAvailable()) {
      try {
        let currentInventario = this.getInventario();
        if (!Array.isArray(currentInventario)) {
          currentInventario = [];
        }
        const index = currentInventario.findIndex((item: any) => item.id === updatedItem.id);
  
        if (index !== -1) {
          currentInventario[index] = { ...currentInventario[index], ...updatedItem };
          localStorage.setItem("inventario", JSON.stringify(currentInventario));
          this.inventarioSubject.next(currentInventario);
          console.log(`Elemento con ID ${updatedItem.id} actualizado correctamente.`);
          this.actualizarArchivoEnBucket(currentInventario);
        } else {
          console.log(`Elemento con ID ${updatedItem.id} no encontrado en el inventario.`);
        }
      } catch (error) {
        console.log("Error al actualizar el elemento en el inventario:", error);
      }
    } else {
      console.log("LocalStorage no está disponible.");
    }
  }
  /**
   * Función que obtiene un item del inventario por ID
   * @param id 
   * @returns {any}
   */
  getItemById(id: string): Observable<any> {
    interface InventarioItem {
      id: number;
      name: string;
      category: string;
      quantity: number;
      price: string;
      description: string;
    }
    return this.http.get<InventarioItem[]>(this.url_inventario).pipe(
      map((inventario: InventarioItem[]) => {
        const itemEncontrado = inventario.find((item) => item.id === Number(id));
        if (itemEncontrado) {
          return itemEncontrado;
        } else {
          return null;
        }
      }),
      catchError((error) => {
        return of(null);
      })
    );
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
  updateItemQuantity(id: number, quantity: number): void {
    if (!this.isLocalStorageAvailable()) {
      console.error("LocalStorage no está disponible.");
      return;
    }
  
    try {
      this.getJsonData().subscribe({
        next: (currentInventario: any[]) => {
          if (!Array.isArray(currentInventario)) {
            console.warn("El inventario está vacío o no es válido.");
            currentInventario = [];
          }
  
          currentInventario = currentInventario.map((item: any, index: number) => {
            if (item.id == null || item.id === undefined) {
              item.id = index + 1;
            }
            return item;
          });
  
          const idNumerico = Number(id);
  
          const index = currentInventario.findIndex((item: any) => Number(item.id) === idNumerico);
  
          if (index !== -1) {
            currentInventario[index].quantity = quantity;
            localStorage.setItem('inventario', JSON.stringify(currentInventario));
            this.inventarioSubject.next(currentInventario);
            this.actualizarArchivoEnBucket(currentInventario);
            console.log(`Cantidad del elemento con ID ${id} actualizada correctamente.`);
          } else {
            console.warn(`Elemento con ID ${id} no encontrado en el inventario.`);
          }
        },
        error: (error) => {
          console.error("Error al obtener el inventario desde el archivo JSON:", error);
        },
      });
    } catch (error) {
      console.error("Error al actualizar la cantidad del elemento:", error);
    }
  }

  private actualizarArchivoEnBucket(inventario: any): void {
    const archivoJSON = new Blob([JSON.stringify(inventario, null, 2)], { type: "application/json" });
    const storageRef = ref(storage, "inventario.json");
    uploadBytes(storageRef, archivoJSON)
      .then((snapshot) => {
        console.log("OK", snapshot.metadata);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  }

  

}
