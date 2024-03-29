import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
  {
    state: 'category',
    name: 'manage category',
    icon: 'category',
    role: 'admin',
  },
  { state: 'product', name: 'manage product', icon: 'inventory_2', role: 'admin' },
];

@Injectable({
  providedIn: 'root',
})
export class MenuItems {
  getMenuItems() {
    return MENUITEMS;
  }
}
