import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { CarsService } from '../cars.service';
import { Car } from '../car.model';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.page.html',
  styleUrls: ['./my-messages.page.scss'],
})
export class MyMessagesPage implements OnInit {

  carbyUserFetched: Car[];
  isloading = false;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private carsService: CarsService) { }

  ngOnInit() {
    this.carsService.FetchCarbyUser().subscribe(resData => {
      this.carbyUserFetched = resData;
    });
  }

  ionViewWillEnter() {
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...'})
    .then(loadingEl => {
      loadingEl.present();
      /*
      this.carsService.FetchMessagebyUser().subscribe(resData => {
      console.log('resData: ', resData);
      this.carbyUserFetched = resData;
      this.isloading = false;
      loadingEl.dismiss();
    });
    */
  });
  }

  onCloseMyMessage() {
    this.navCtrl.navigateBack('/cars');
  }

  onDeletMessage(id: string) {
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Loading...'})
    .then(loadingEl => {
      loadingEl.present();
      /*
      this.carsService.DeleteMessage(id).subscribe(resData => {
      console.log('resData: ', resData);
      this.carbyUserFetched = this.carbyUserFetched.filter(item => item.id !== id);
      this.isloading = false;
      loadingEl.dismiss();
    });
    */
  });
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
