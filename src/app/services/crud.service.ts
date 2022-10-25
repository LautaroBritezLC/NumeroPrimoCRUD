import { Injectable } from '@angular/core';
import { collection, Firestore , addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {numeroPrimo} from '../models/Modelo';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private $numero = new Subject<any>();

  constructor(private firestore: Firestore
    
    ) { }

  addTarjeta(numero: numeroPrimo) {
    const tarjetaRef = collection(this.firestore, 'numeros');
    return addDoc(tarjetaRef, numero)
  }

  getTargeta(): Observable<numeroPrimo[]> {
    const tarjetaRef = collection(this.firestore, 'numeros');
    return collectionData(tarjetaRef, {idField: 'id'}) as Observable<numeroPrimo[]>;
  }

  deleteTarjeta(numero: numeroPrimo) {
    const tarjetaRef = doc(this.firestore, `numeros/${numero.id}`);
    return deleteDoc(tarjetaRef);
  }

  updateTarjeta(id: string , numero: numeroPrimo) {
    const placeRef = doc(this.firestore, `numeros/${id}`);
    console.log(placeRef);
    return updateDoc(placeRef, { ...numero });
  }
  
  addtarjetaEdit(numero : numeroPrimo) {
    this.$numero.next(numero);
  }

  getTarjetaEdit(): Observable<numeroPrimo> {
    return this.$numero.asObservable();
  }

}
