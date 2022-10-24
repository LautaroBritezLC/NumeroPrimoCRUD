import { Injectable } from '@angular/core';
import { collection, Firestore , addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {tarjetaCredito} from '../models/Modelo';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private $tarjeta = new Subject<any>();

  constructor(private firestore: Firestore) { }

  addTarjeta(tarjeta: tarjetaCredito) {
    const tarjetaRef = collection(this.firestore, 'tarjetaCredito');
    return addDoc(tarjetaRef, tarjeta)
  }

  getTargeta(): Observable<tarjetaCredito[]> {
    const tarjetaRef = collection(this.firestore, 'tarjetaCredito');
    return collectionData(tarjetaRef, {idField: 'id'}) as Observable<tarjetaCredito[]>;
  }

  deleteTarjeta(tarjeta: tarjetaCredito) {
    const tarjetaRef = doc(this.firestore, `tarjetaCredito/${tarjeta.id}`);
    return deleteDoc(tarjetaRef);
  }

  updateTarjeta(id: string , tarjeta: tarjetaCredito) {
    const placeRef = doc(this.firestore, `tarjetaCredito/${id}`);
    return updateDoc(placeRef, { ...tarjeta });
  }
  
  addtarjetaEdit(tarjeta : tarjetaCredito) {
    this.$tarjeta.next(tarjeta);
  }

  getTarjetaEdit(): Observable<tarjetaCredito> {
    return this.$tarjeta.asObservable();
  }

}
