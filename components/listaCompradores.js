import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {StoreContext} from '../context/storeContext';
import {ColorPicker} from 'react-native-color-picker';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
  cardText: {textAlign: 'center', fontWeight: 'bold'},
});

export const ListaCompradores = () => {
  const {compradores, setCompradores} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);
  const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
  const [mailNuevoComprador, setMailNuevoComprador] = useState('');
  const [nombreComprador, setNombreComprador] = useState('');
  const [mailComprador, setMailComprador] = useState('');
  const [idComprador, setIDComprador] = useState('');
  const screenDirection = useOrientation();

  const crearComprador = () => {
    setCompradores([
      ...compradores,
      {
        nombre: nombreNuevoComprador,
        mail: mailNuevoComprador,
        color: 'red',
        id: Math.random().toString(10),
      },
    ]);
    setNombreNuevoComprador('');
    setMailNuevoComprador('');
    setModalVisible(false);
  };

  const modificarComprador = () => {

    const comprador = {
        id: idComprador,
        nombre: nombreComprador,
        mail: mailComprador,
        color: 'red'
    }

    const compradoresModificado = compradores.map(o => o.id == comprador.id ? comprador : o);

    setCompradores(compradoresModificado);

    setNombreComprador('');
    setMailComprador('');
    setIDComprador('');
    setModalVisible2(false);
  };

  const eliminarComprador = () => {
    const compradoresSinComprador = compradores.filter(o => o.id != idComprador);
    setCompradores(compradoresSinComprador);
    setModalVisible2(false);
  }

  const desplegarModal = (item) => {
    setNombreComprador(item.nombre);
    setMailComprador(item.mail);
    setIDComprador(item.id);
    setModalVisible2(true);
    return;
    }

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title={'Crear un comprador'}>
        <>
          {primaraPantalla && (
            <PrimeraPantalla
              nombreNuevoComprador={nombreNuevoComprador}
              setNombreNuevoComprador={setNombreNuevoComprador}
              mailNuevoComprador={mailNuevoComprador}
              setMailNuevoComprador={setMailNuevoComprador}
              setPrimeraPantalla={setPrimeraPantalla}
              crearComprador={crearComprador}
            />
          )}
        </>
      </BottomSheetModal>
      <BottomSheetModal
        visible={modalVisible2}
        onClosePressed={() => setModalVisible2(false)}
        title={'Modificar un comprador'}>
        <>
          {
            <ModificarComprador
                nombreComprador={nombreComprador}
                mailComprador={mailComprador}
                idComprador={idComprador}
                setNombreComprador={setNombreComprador}
                setMailComprador={setMailComprador}
                setIDComprador={setIDComprador}
                modificarComprador={modificarComprador}
                eliminarComprador={eliminarComprador}
            />
          }
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={compradores}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: 'red'}}
              key={item.id}
              onPress={() => desplegarModal(item)}
              >
              <Text style={styles.cardText}>{item.nombre}</Text>
              <Text style={styles.cardText}>{item.mail}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
  nombreNuevoComprador,
  setNombreNuevoComprador,
  mailNuevoComprador,
  setMailNuevoComprador,
  setPrimeraPantalla,
  crearComprador,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre de Comprador"
        style={styles.textInput}
        value={nombreNuevoComprador}
        onChangeText={(nuevoTexto) => {
          setNombreNuevoComprador(nuevoTexto);
        }}
      />
      <TextInput
        placeholder="Mail de Comprador"
        style={styles.textInput}
        value={mailNuevoComprador}
        onChangeText={(nuevoTexto) => {
          setMailNuevoComprador(nuevoTexto);
        }}
      />
      <Button style={styles.modalButton} onPress={() => crearComprador()}>
        Crear Comprador
      </Button>
    </>
  );
};

const ModificarComprador = ({nombreComprador, mailComprador, setNombreComprador, setMailComprador, modificarComprador, eliminarComprador}) => {
    return (
        <>
          <TextInput
            placeholder="Nombre de Comprador"
            style={styles.textInput}
            value={nombreComprador}
            onChangeText={(nuevoTexto) => {
              setNombreComprador(nuevoTexto);
            }}
          />
          <TextInput
            placeholder="Mail de Comprador"
            style={styles.textInput}
            value={mailComprador}
            onChangeText={(nuevoTexto) => {
              setMailComprador(nuevoTexto);
            }}
          />
          <Button style={styles.modalButton} onPress={() => modificarComprador()}>
            Modificar Comprador
          </Button>
          <Button style={styles.modalButton} onPress={() => eliminarComprador()}>
            Eliminar Comprador
          </Button>
        </>
      );
}

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
