import { Component } from '@angular/core';
import { GraphqlService } from './services';
import { AuthorizeService } from '../api-authorization/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'app';

  constructor(private graphQlService: GraphqlService, private authorizeService: AuthorizeService) {
  }

  ngOnInit(): void {
    //this.graphQlService.getUsers();

    if (!this.authorizeService.isAuthenticated()) {

      this.authorizeService.signIn(true).then(result => {
        console.log(result.status.toString());
      });
    }

    //this.graphQlService.getUserByUserName("RescatorX");
  }
}
