// import { Injectable } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { CONFIG } from '../config/config';

// @Injectable()
// export class ApolloClient {
//   constructor(public apollo: Apollo, public httpLink: HttpLink) {
//     apollo.create({
//         // By default, this client will send queries to the
//         // `/graphql` endpoint on the same host
//         link: httpLink.create({
//             uri: CONFIG.backendUrl + 'graphql'
//         }),
//         cache: new InMemoryCache()
//     });
//   }
//   init() {
//     return this.apollo;
//   }
// }
