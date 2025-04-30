import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs'; 

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnDestroy{

  
    
    subscription: Subscription;

    darkMode: boolean = false;

    constructor(public router: Router, private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark'  ? true : false;
        });
    }
     

    scrollToElement($element: any): void {
        setTimeout(() => {
            $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 200);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    portalweb(){
        window.open("https://portalweb.server.cableytv.com/#/login" , "_blank");
    }

    pse()
    {
        window.open("https://pagos.internetinalambrico.com.co" , "_blank");
    }

    pqr()
    {
        window.open("https://pqr.internetinalambrico.com.co/in/nuevapqr.php" , "_blank");
    }
    test()
    {
        window.open("http://internetinalambrico.speedtestcustom.com/" , "_blank");
    }

    redirectTo()
    {
        this.router.navigateByUrl("/landing/contact")
    }

    sendWs(item:string){

        const number = "573133487089";
        const mesage = `Hola, estoy interesado en el plan ${item}`;
        var url = `https://wa.me/${number}?text=${encodeURIComponent(mesage)}`;
        window.open(url, '_blank');
      }
      helpWs(){
        const number = "573133487089";
        const mesage = `Hola, vengo de la página web de internetinalambrico`;
        var url = `https://wa.me/${number}?text=${encodeURIComponent(mesage)}`;
        window.open(url, '_blank');
      }

      
}
