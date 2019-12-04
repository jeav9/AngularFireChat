import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private fireDb: AngularFirestore) { }

  loadMessages() {
    this.itemsCollection = this.fireDb.collection<Mensaje>('chats',
      ref =>
        ref.orderBy('fecha', "desc")
          .limit(10)
    );

    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
        this.chats = [];

        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      }));
  }

  addMessage(message: string) {
    let mensaje: Mensaje = {
      mensaje: message,
      nombre: 'demo',
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);
  }
}
