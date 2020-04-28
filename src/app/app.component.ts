import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular PWA Starter';
  updates: boolean = false;
  joke: any;
  jokeLoading: boolean = true;

  constructor(updates: SwUpdate, private data: DataService) {
    updates.available.subscribe(event => {
      this.updates = true;
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {
    this.data.getRandomJoke().subscribe(res => {
      this.jokeLoading = false;
      this.joke = res;
    });
  }
}
