import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public user: any = {};

  constructor(private fireDb: AngularFirestore, public fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe(res => {
      if (!res) {
        return;
      }

      console.log(res);
      this.user.name = res.displayName;
      this.user.uid = res.uid;

    });
  }

  login() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.user = {};
    this.fireAuth.auth.signOut();
  }

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
      nombre: this.user.name,
      fecha: new Date().getTime(),
      uid: this.user.uid
    }

    return this.itemsCollection.add(mensaje);
  }
}
