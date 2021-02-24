/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Listar from './components/listar';
import Detalle from './components/detalle';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {StoreProvider} from './context/storeContext';
import {Home} from './components/home';
import {ListaCategorias} from './components/listaCategorias';
import {ListaCompradores} from './components/listaCompradores';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const Stack = createStackNavigator();

export const screens = {
  listar: 'Listado de Productos',
  detalle: 'Detalle de Producto',
  homepage: 'Pagina Principal',
  listaCategorias: 'Categorias',
  listaCompradores: 'Compradores',
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator>
            <Stack.Screen
              initial={true}
              name={screens.homepage}
              options={{headerShown: false}}
              component={Home}
            />
            <Stack.Screen name={screens.listar} component={Listar} />
            <Stack.Screen name={screens.detalle} component={Detalle} />
            <Stack.Screen
              name={screens.listaCategorias}
              component={ListaCategorias}
            />
            <Stack.Screen
            name={screens.listaCompradores}
            component={ListaCompradores}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
