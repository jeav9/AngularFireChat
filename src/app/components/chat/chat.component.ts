import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/provider/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string;
  elemento: any;

  constructor(public chatService: ChatService) {
    this.chatService.loadMessages()
      .subscribe(() => {

        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);

      });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    if (this.mensaje.length > 0) {
      this.chatService.addMessage(this.mensaje)
        .then(() => this.mensaje = '')
        .catch(() => console.log('Error al guardar.'));
    }

  }

}
