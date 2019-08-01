import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {

  form: FormGroup;
  isloading = false;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private carsService: CarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      name: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      description: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(200)] }),
    });
  }

  onCloseNewMessage() {
    this.navCtrl.navigateBack('/cars');
  }

  onSubmit() {
    console.log(this.form);
    const title = this.form.value.title;
    const name = this.form.value.name;
    const description = this.form.value.description;
    this.isloading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Send new message...' })
      .then(loadingEl => {
        loadingEl.present();
        /*
        this.carsService.NewMessage(title, name, description).subscribe(resDate => {
          console.log('resDate new message:', resDate);
          this.isloading = false;
          loadingEl.dismiss();
          this.form.reset();
          this.navCtrl.navigateBack('/cars');
      },
      error => {
        console.log('Error trying send new message: ', error);
      },
      () => {
        console.log('New message complete');
      }
      );
        */
      });
  }

}
