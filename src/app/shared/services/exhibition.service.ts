import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Exhibition } from '../models/Exhibition';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionService {

  collectionName = 'Exhibitions';
  exhibitions: Exhibition[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  create(exhibition: Exhibition){
    return this.afs.collection<Exhibition>(this.collectionName).doc(exhibition.id).set(exhibition);
  }

  getAll(){
    return this.afs.collection<Exhibition>(this.collectionName).valueChanges();
  }

  update(exhibition: Exhibition) {
    return this.afs.collection<Exhibition>(this.collectionName).doc(exhibition.id).update(exhibition);
  }

  delete(id: string) {
    return this.afs.collection<Exhibition>(this.collectionName).doc(id).delete();
  }

  loadImageMeta():Observable<Array<Exhibition>>{
    return this.orderExhibitions();
   }

   loadImage(imageUrl: string): Observable<string> {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getDetailsByExId(exId: string): Observable<Exhibition[]> {
    return this.afs.collection<Exhibition>(this.collectionName, ref => ref.where('id', '==', exId)).valueChanges();
  }

  orderExhibitions(){
    return this.firestore.collection('Exhibitions', ref => ref.orderBy('date', 'asc')).valueChanges()as  Observable<Array<Exhibition>>;
  }


}
