import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class HeroService {
  data: any;
  constructor(public http: HttpClient) {
    console.log('Hello HeroService');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }


    return new Promise(resolve => {

      var timestamp = Number(new Date());
      var hash = Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a');

      this.http.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=100&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


  getDescription(id: number) {
    return new Promise(resolve => {
      let md5 = new Md5();

      var timestamp = Number(new Date());
      var hash = Md5.hashStr(
        timestamp +
          "ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a"
      );

      this.http
        .get(
          `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&orderBy=name&limit=20&apikey=d8b23f3429d72898aaffd1a321761b4a&hash=${hash}`
        )
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


}
