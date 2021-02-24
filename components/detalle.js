import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, StyleSheet, Text as TextNative} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import {StoreContext} from '../context/storeContext';
import {FlatList} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';
import SeleccionarCategoria from './seleccionarCategoria';
import SeleccionarComprador from './seleccionarComprador';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logo: {
    flex: 1,
    height: 240,
  },
  contenedorImgPrecio: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 2,
  },
  infoProducto: {
    borderLeftColor: 'grey',
    borderLeftWidth: 2,
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
  },
  form: {marginBottom: 30},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnVolver: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnGuardar: {
    flex: 2,
    marginHorizontal: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
  },
  textPrice: {
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'left',
    marginTop: 'auto',
    marginLeft: 10,
  },
  textPriceDiscount: {
    fontSize: 20,
    color: '#00a650',
  },
  textEnvio: {
    fontSize: 18,
    fontWeight: '200',
    fontStyle: 'italic',
    textAlign: 'left',
    color: '#00a650',
    marginTop: 5,
    lineHeight: 32, // Mismo height que el icono para que el texto tenga la base en la misma linea
  },
  icon: {
    width: 32,
    height: 32,
  },
  chip: {
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
});

const Detalle = ({route: {params}, ...props}) => {
  const navigator = useNavigation();
  const {producto} = params;
  const {obtenerCategoriasDelProducto} = useContext(StoreContext);
  const categorias = obtenerCategoriasDelProducto(producto);
  const [categoriasModal, setCategoriasModal] = useState(false);
  const {obtenerCompradoresDelProducto} = useContext(StoreContext);
  const compradores = obtenerCompradoresDelProducto(producto);
  const [compradoresModal, setCompradoresModal] = useState(false);

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={categoriasModal}
        onClosePressed={() => setCategoriasModal(false)}
        title="Seleccionar Categoria">
        <SeleccionarCategoria producto={producto} />
      </BottomSheetModal>
      <BottomSheetModal
        visible={compradoresModal}
        onClosePressed={() => setCompradoresModal(false)}
        title="Seleccionar Comprador">
        <SeleccionarComprador producto={producto} />
      </BottomSheetModal>
      <Text category="h4">{producto.title}</Text>
      <View style={[styles.contenedorImgPrecio]}>
        <Image
          style={styles.logo}
          source={{
            uri: producto.thumbnail,
          }}
        />
        <View style={styles.infoProducto}>
          <TextNative style={styles.text}>
            Estado: {producto.condition}
          </TextNative>
          <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10}}>
            <Icon style={styles.icon} fill="#00a650" name="car-outline" />
            <TextNative style={styles.textEnvio}>
              Llega gratis el{' '}
              <TextNative style={{fontWeight: 'bold'}}>Miércoles</TextNative>
            </TextNative>
          </View>
          <TextNative style={styles.text}>
            Forma de pago: {'\n' + producto.installments.quantity} cuotas de{' '}
            {producto.installments.amount}
          </TextNative>
          <TextNative style={styles.textPrice}>
            ${producto.price}{' '}
            <TextNative style={styles.textPriceDiscount}>
              {100 - producto.installments.rate}% Off
            </TextNative>
          </TextNative>
        </View>
      </View>
      <Text>Categorias:</Text>
      <FlatList
        data={categorias}
        horizontal
        renderItem={({item}) => (
          <View style={[styles.chip, {backgroundColor: item.color}]}>
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
      <Text>Compradores:</Text>
      <FlatList
        data={compradores}
        horizontal
        renderItem={({item}) => (
          <View style={[styles.chip, {backgroundColor: item.color}]}>
            <Text>{item.mail}</Text>
          </View>
        )}
      />
      <View style={styles.form}>
        <View style={styles.buttons}>
          <Button
            appearance="outline"
            style={styles.btnVolver}
            onPress={() => {
              setCategoriasModal(true);
            }}>
            MODIFICAR CATEGORIAS
          </Button>
          <Button
            appearance="outline"
            style={styles.btnVolver}
            onPress={() => {
              setCompradoresModal(true);
            }}>
            MODIFICAR COMPRADORES
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            appearance="outline"
            style={styles.btnVolver}
            onPress={() => {
              navigator.goBack();
            }}>
            VOLVER
          </Button>
          <Button
            status="success"
            style={styles.btnGuardar}
            onPress={() => {
              navigator.goBack();
            }}>
            GUARDAR
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Detalle;
