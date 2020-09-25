import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@ionic-native/in-app-browser/ngx';
import { PrintService } from './print.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  url: any;
  bluetoothList: any = [];
  selectedPrinter: any;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private theInAppBrowser: InAppBrowser,
    private sanitize: DomSanitizer,
    public btSerial: BluetoothSerial,
    private print: PrintService
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.selectedPrinter = this.print.connectToBluetoothPrinter();
  }


  urlpaste() {
    this.url = 'https://cors-anywhere.herokuapp.com/http://www.uol.com.br';
    return this.sanitize.bypassSecurityTrustResourceUrl(this.url);
  }

  // This will print
  printStuff() {
    // The text that you want to print
    const myText = 'Está é uma impressão de teste \n\n\n Impressão teste :) \n\n\n';
    this.print.sendToBluetoothPrinter(myText);
  }
}
