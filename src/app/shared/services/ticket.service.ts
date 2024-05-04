import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Ticket } from '../models/Ticket';
import { Exhibition } from '../models/Exhibition';
import { Observable, catchError, forkJoin, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  collectionName = 'Tickets';
  exhibitions: Exhibition[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  create(ticket: Ticket){
    return this.afs.collection<Ticket>(this.collectionName).doc(ticket.userId+ticket.exhibitionId).set(ticket);
  }

  delete(id: string) {
    return this.afs.collection<Ticket>(this.collectionName).doc(id).delete();
  }

  getMyTickets(userId: string): Observable<any> {
    return this.firestore.collection('Tickets', ref => ref.where('userId', '==', userId))
      .get()
      .pipe(
        switchMap(querySnapshot => {
          const ticketObservables: Observable<any>[] = [];
          querySnapshot.forEach(doc => {
            const ticketData: Ticket = doc.data() as Ticket;
            const exhibitionId = ticketData.exhibitionId;
            const exhibition$ = this.firestore.collection('Exhibitions').doc(exhibitionId)
              .get()
              .pipe(
                map(exhibitionDoc => {
                  const exhibitionData = exhibitionDoc.data() as Exhibition;
                  return {
                    id: exhibitionData.id,
                    title: exhibitionData.title,
                    description: exhibitionData.description,
                    price: exhibitionData.price,
                    date: exhibitionData.date,
                    image_url: exhibitionData.image_url,
                  } as Exhibition;
                })
              );
            ticketObservables.push(exhibition$);
          });
          return forkJoin(ticketObservables);
        }),
        catchError(error => {
          console.error('Hiba történt a jegyek lekérdezése során:', error);
          return throwError(error);
        })
      );
  }
}
