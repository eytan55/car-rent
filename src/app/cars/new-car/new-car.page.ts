import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
})
export class NewCarPage implements OnInit {

  form: FormGroup;
  isloading = false;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private carsService: CarsService) { }

  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
        name: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
        location: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
        description: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(200)]}),
        startdate: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
        enddate: new FormControl(null, { updateOn: 'blur', validators: [Validators.required]}),
        price: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.pattern('^[0-9]*$')]})
    });
  }

  onCloseNew() {
    this.navCtrl.navigateBack('/post');
  }

  onSubmit() {
    console.log(this.form);
    const title = this.form.value.title;
    const name = this.form.value.name;
    const location = this.form.value.location;
    const description = this.form.value.description;
    const startdate = this.form.value.startdate;
    const enddate = this.form.value.enddate;
    const price = this.form.value.price;
    this.isloading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Creating new car ad...'})
    .then(loadingEl => {
      loadingEl.present();
      this.carsService.NewCar(title, name, location, description, startdate, enddate, price).subscribe(resDate => {
        this.isloading = false;
        loadingEl.dismiss();
        this.form.reset();
        this.navCtrl.navigateBack('/post');
    },
    error => {
      console.log('Error trying create new car: ', error);
    },
    () => {
      console.log('New car complete');
    }
    );
  });
  }

}
