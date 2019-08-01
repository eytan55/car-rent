import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { CarsService } from './cars.service';
import { Car } from './car.model';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

 // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  carsFetched: Car[];
  limit: number = 200;
  truncating = true;
  PostSelected: Car;
  isloading = false;

  constructor(private navCtrl: NavController, private carsService: CarsService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.carsService.GetAllCars().subscribe(resData => {
      this.carsFetched = resData;
    });
  }

  ionViewWillEnter() {
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...'})
    .then(loadingEl => {
      loadingEl.present();
      this.carsService.GetAllCars().subscribe(resData => {
      this.carsFetched = resData;
      this.isloading = false;
      loadingEl.dismiss();
    });
  });
  }

  onNew() {
    this.navCtrl.navigateForward('/cars/new');
  }

  onNotif() {
    this.navCtrl.navigateForward('/cars/my-messages');
  }

  onSendMessage(id: string) {
    this.navCtrl.navigateForward('/cars/my-messages' + id);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll

      event.target.disabled = true;

    }, 500);
  }



}
