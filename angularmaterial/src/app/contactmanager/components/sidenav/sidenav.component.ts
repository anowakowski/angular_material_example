import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

    users: Observable<User[]>;

    constructor(
      zone: NgZone,
      private router: Router,
      private userServce: UserService) {
      // this.mediaMatcher.addListener(mql =>
      //   zone.run(() => this.mediaMatcher = mql));
    }

  showFiller = false;

  ngOnInit() {
    this.users = this.userServce.users;
    this.userServce.loadAll();

    this.users.subscribe(data => {
      console.log(data);
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
