import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private storageKey = 'aaab';

  setFormData(data: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getFormData(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
   
}
