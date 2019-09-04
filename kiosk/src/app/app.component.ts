import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  data = {};
  constructor(private socket: Socket) {
    this.socket.on('SensorsDataReceived', (data) => { this.data = data; });
  }
  title = 'kiosk';
  temperature = 28.3;
}
