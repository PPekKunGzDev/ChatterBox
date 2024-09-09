import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ChatterBox';

  showHead: boolean = false;

  ngOnInit() {
  }

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/auth/login' || event['url'] === '/auth/register') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
