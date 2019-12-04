import { Component } from '@angular/core';
import { ChatService } from 'src/app/provider/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private chatService: ChatService) { }

  login(user: string) {
    this.chatService.login();
  }
}
