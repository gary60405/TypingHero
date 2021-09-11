import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-toolbar color="primary">這是primary的toolbar</mat-toolbar>
    <!-- <div class="container-fluid container-overflow">
      <div class="row">
        <div class="col p-0">
          <app-toolbar></app-toolbar>
        </div>
      </div>
      <div class="row mh-100">
        <div class="col p-0">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div> -->
  `,
  styles: [
    `
      .container-overflow {
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
      }
    `
  ]
})
export class AppComponent {

  constructor() {

  }

}
