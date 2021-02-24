import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

const SeleccionarCategoria = ({producto}) => {
  const {
    obtenerCategoriasDelProducto,
    categorias,
    agregarProductoACategoria,
    quitarProductoDeCategoria,
  } = useContext(StoreContext);
  const categoriasDelProducto = obtenerCategoriasDelProducto(producto);

  const renderItem = ({item, index}) => {
    const categoria = item;

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

    const categoriaAsignada = categoriasDelProducto
      .map((c) => c.id)
      .includes(categoria.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={categoriaAsignada}
          onChange={() => {
            if (!categoriaAsignada) {
              agregarProductoACategoria(categoria, producto);
            } else {
              quitarProductoDeCategoria(categoria, producto);
            }
          }}>
          <Text category="s1">
            {categoria.nombre}
            {'    '}
            {renderColor(categoria.color)}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={categorias}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default SeleccionarCategoria;
