import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
      RouterModule,
      MatIconModule, 
      MatToolbarModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
