import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { UserType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  public users: UserType[];

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    this.apollo.create({
      link: httpLink.create({ uri: 'https://localhost:5001/graphql' }),
      cache: new InMemoryCache()
    })
  }

  public getUsers = () => {
    this.apollo.query({
      query: gql`query getUsers{
      users{
        id,
        firstNname,
        lastName
      }
    }`
    }).subscribe(result => {
      this.users = result.data as UserType[];
      console.log(this.users);
    })
  }
}
