import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarComprador = ({producto}) => {
  const {
    obtenerCompradoresDelProducto,
    compradores,
    agregarProductoAComprador,
    quitarProductoDeComprador,
  } = useContext(StoreContext);
  const compradoresDelProducto = obtenerCompradoresDelProducto(producto);

  const renderItem = ({item, index}) => {
    const comprador = item;

    const renderColor = (color) => {
      return (
        <View
          style={[
            styles.chip,
            {
              backgroundColor: color,
            },
          ]}
        />
      );
    };

    const compradorAsignada = compradoresDelProducto
      .map((c) => c.id)
      .includes(comprador.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={compradorAsignada}
          onChange={() => {
            if (!compradorAsignada) {
              agregarProductoAComprador(comprador, producto);
            } else {
              quitarProductoDeComprador(comprador, producto);
            }
          }}>
          <Text category="s1">
            {comprador.nombre}
            {'    '}
            {renderColor(comprador.color)}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={compradores}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarComprador;
