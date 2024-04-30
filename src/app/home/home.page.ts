import { Component } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';
//import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  temperature: number = 0; // Valor inicial del termómetro
  

  getMeterColor() {
    if (this.temperature >= 0 && this.temperature <= 50) {
      return '#1B1A55';
    } else if (this.temperature >= 51 && this.temperature <= 100) {
      return '#E9C874';
    }
    else {
      return '#FFC55A';
    }
  }

  getMeterHeight() {
    return `${this.temperature}%`;
  }
  constructor(private database:Database) {}
  ngOnInit() {
    const route = ref(this.database, 'sensor');
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      this.temperature = valores_db.valor;
      
    });
  }
 /*
  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "¡Alerta de sol matutino!",
          body: "Despierta y brilla más que una pantalla de smartphone en modo de alta luminosidad",
          id: 1
        }
      ]
    });
  }

  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "¡Atencion !",
          body: "¡Hora de desenchufarse! Pero antes, recuerda: los sueños son solo actualizaciones del software humano.",
          id: 1
        }
      ]
    });
  }
*/
}
