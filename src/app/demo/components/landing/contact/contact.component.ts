import { AfterViewInit, Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service'; 
 
import * as L from 'leaflet';
import { MessageService } from 'primeng/api';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact-landing',  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers:[MessageService]
})
export class ContactComponent implements AfterViewInit{
  private map:L.Map | undefined;

  options: any;

  overlays: any[] = [];

  dialogVisible: boolean = false;

  markerTitle: string = '';

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean = false;

  name: string = '';

  email: string = '';

  message: string = '';

  content: any[] = [
      {icon: 'pi pi-fw pi-phone', title: 'Phone', info:'1 (833) 597-7538'},
      {icon: 'pi pi-fw pi-map-marker', title: 'Our Head Office', info:'Churchill-laan 16 II, 1052 CD, Amsterdam'},
      {icon: 'pi pi-fw pi-print', title: 'Fax', info:'3 (833) 297-1548'}
  ];

  constructor(private layoutService: LayoutService , private _route:Router , private _messageService:MessageService , private _contactService:ContactService) { }


  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap():void{

    this.map = L.map('map', {
      center: [20, 0],
      zoom: 13,  // Zoom inicial reducido
      minZoom: 2,  // Establecer un zoom mínimo
      maxZoom: 18 
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const markers = [
      { lat: 4.8558, lng: -73.0394, name: 'Sabanalarga' },
      { lat: 4.8761, lng:-72.8797, name: 'Monterrey' },
      { lat: 6.4501 , lng: -71.7182, name: 'Tame' },
      { lat: 5.8214 , lng: -72.1718, name: 'Tamara' },
      { lat: 5.6346 , lng: -72.1959, name: 'Nunchia' },
      { lat: 5.1640, lng: -72.5381 , name: 'Aguazul' },
      { lat: 4.61, lng: -72.9206, name: 'Villanueva' },
      { lat: 5.3421 , lng: -72.3873 , name: 'Yopal' }
    ];

    markers.forEach(marker => {
      L.marker([marker.lat, marker.lng])
        .addTo(this.map!)
        .bindPopup(marker.name);
    });

    // Ajustar la vista para que se vean todos los marcadores
    const group = L.featureGroup(markers.map(marker => L.marker([marker.lat, marker.lng])));
    this.map.fitBounds(group.getBounds().pad(0.1));

  }

  get mapStyle() {
      return {
          'background-image':  this.layoutService.config().colorScheme === 'light' ? "url('assets/demo/images/contact/map-light.svg')" : "url('assets/demo/images/contact/map-dark.svg')"
      }
  }

  redirectTo(item:string)
  {
    switch (item) {
      case "inicio":
        this._route.navigateByUrl("/landing/es")
        break;
      case "planes":
        this._route.navigateByUrl("/landing/es#pricing")
        break;
      case "nosotros":
        this._route.navigateByUrl("/landing/es#nosotros")
      break;
      default:
        break;
    }
  }

  sendMail()
  {
    if(this.name.length && this.email.length && this.message.length)
    {
      const data = { 
        to : this.email,
        subject:'Mensaje enviando desde página web',
        message : `${this.name} : ${this.message}`
      }

      this._contactService.sendMail(data).subscribe({
        next:(resp:any) => {
          this._messageService.add({severity:'info' , summary:'Envio' , detail:'Correo enviado con éxito'})
          this.name = '';
          this.email= '';
          this.message = '';
        },error:(error) => {
          this._messageService.add({severity:'error' , summary:'Error' , detail:'Error enviando el correo'})
        }
      })
    }else{
      this._messageService.add({severity:'info' , summary:'Campos obligatorios' , detail:'debe agregar todos los campos'})
    }
  }

 
}
