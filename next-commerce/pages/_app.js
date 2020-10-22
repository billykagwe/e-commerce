import '../styles/tailwind.css'
import Cart from '../contexts/Cart'
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';

import * as Realm from "realm-web";

const REALM_APP_ID = "https://realm.mongodb.com/api/client/v2.0/app/shop-biyil/graphql"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

const client = new ApolloClient({
    uri: 'https://realm.mongodb.com/api/client/v2.0/app/shop-biyil/graphql',
    cache: new InMemoryCache(),
    headers: {
      "Authorization": ""
    }
  });

function MyApp({ Component, pageProps }) {
  return(
      <ApolloProvider client={client}>
      <Cart>
          <Component {...pageProps} />
      </Cart>
      </ApolloProvider>
   )
}

export default MyApp
