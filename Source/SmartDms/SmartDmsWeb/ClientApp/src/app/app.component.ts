import { Component } from '@angular/core';
import { GraphqlService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private graphQlService: GraphqlService) {
  }

  ngOnInit(): void {
    this.graphQlService.getUsers();
  }
}
