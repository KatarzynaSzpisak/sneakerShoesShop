import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  getOrders() {
    return fetch('http://localhost:5000/admin')
    .then(response =>
      response.json()
    );
  }
}


