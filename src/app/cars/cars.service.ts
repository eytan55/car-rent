import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { tap, take, map } from 'rxjs/operators';
import { Car } from './car.model';
import { Message } from './message.model';

interface CarData {
  _startdate: string;
  _enddate: string;
  _creationDate: string;
  _creator: string;
  _name: string;
  _location: string;
  _price: string;
  _description: string;
  _finished: boolean;
  _title: string;
}

interface MessageData {
  _creationDate: string;
  _creator: string;
  _name: string;
  _price: string;
  _description: string;
  _title: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  newCar: Car;
  newMessage: Message;

  _cars: Car[];
  _messages: Message[];

  constructor(private http: HttpClient, private navCtrl: NavController, private authService: AuthService) { }

  GetAllCars() {
    return this.http.get<{ [key: string]: CarData }>('https://lend-car.firebaseio.com/cars.json')
      .pipe(map(resData => {
        const cars = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            // tslint:disable-next-line: max-line-length
            cars.push(new Car(key, resData[key]._creator, resData[key]._title, resData[key]._name, resData[key]._location, resData[key]._description, new Date(resData[key]._startdate), new Date(resData[key]._enddate), resData[key]._price, new Date(resData[key]._creationDate), resData[key]._finished));
          }
        }
        this._cars = cars;
        return this._cars;
      })
      );
  }

  GetCarbyID(id: string) {
    return this._cars.find(p => p.id === id);
  }

  FetchCarbyUser() {
    let userIdget;
    this.authService.userId.pipe(take(1)).subscribe(userId => {
      if (!userId) {
        return;
      }
      userIdget = userId;
    });

    // tslint:disable-next-line: max-line-length
    return this.http.get<{ [key: string]: CarData }>(`https://lend-car.firebaseio.com/cars.json?orderBy="_creator"&equalTo="${userIdget}"`)
    .pipe(map(resData => {
      const cars = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          // tslint:disable-next-line: max-line-length
          cars.push(new Car(key, resData[key]._creator, resData[key]._title, resData[key]._name, resData[key]._location, resData[key]._description, new Date(resData[key]._startdate), new Date(resData[key]._enddate), resData[key]._price, new Date(resData[key]._creationDate), resData[key]._finished));
        }
      }
      return cars;
    })
    );
  }

  NewCar(
    title: string,
    name: string,
    location: string,
    description: string,
    startdate: Date,
    enddate: Date,
    price: string) {
    this.authService.userId.pipe(take(1)).subscribe(userId => {
      if (!userId) {
        return;
      }
      this.newCar = new Car(null, userId, title, name, location, description, startdate, enddate, price, new Date(), false);

    });
    return this.http.post<{ name: string }>('https://lend-car.firebaseio.com/cars.json', { ...this.newCar, id: null })
      .pipe(tap(resData => {
        this.newCar.id = resData.name;
        this._cars.push(this.newCar);
      },
        (error) => {
          console.log('erreur lors de la creation dun new post: ', error);
        }));
  }

  DeleteCar(id: string) {
    return this.http.delete<{ [key: string]: CarData }>(`https://lend-car.firebaseio.com/cars/${id}.json`)
    .pipe(tap(resData => {
    },
    (error) => {
      console.log('erreur lors de la suppression dun post: ', error);
    }));
  }

  NewMessage(
    title: string,
    name: string,
    description: string,
) {}


  FetchMessagebyUser() {
  }

  DeleteMessage(id: string) {

  }
}
