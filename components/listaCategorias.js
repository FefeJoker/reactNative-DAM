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

export const ListaCategorias = () => {
  const {categorias, setCategorias} = useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState('');
  const [colorNuevaCategoria, setColorNuevaCategoria] = useState('red');
  const screenDirection = useOrientation();

  const crearCategoria = () => {
    setCategorias([
      ...categorias,
      {
        nombre: nombreNuevaCategoria,
        color: colorNuevaCategoria,
        id: Math.random().toString(10),
      },
    ]);
    setNombreNuevaCategoria('');
    setColorNuevaCategoria('red');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title={primaraPantalla ? 'Crear una categoria' : 'Elegir Color'}>
        <>
          {primaraPantalla && (
            <PrimeraPantalla
              nombreNuevaCategoria={nombreNuevaCategoria}
              setNombreNuevaCategoria={setNombreNuevaCategoria}
              colorNuevaCategoria={colorNuevaCategoria}
              setPrimeraPantalla={setPrimeraPantalla}
              crearCategoria={crearCategoria}
            />
          )}
          {!primaraPantalla && (
            <SegundaPantalla
              setPrimeraPantalla={setPrimeraPantalla}
              setColorNuevaCategoria={setColorNuevaCategoria}
            />
          )}
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={categorias}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={styles.cardText}>{item.nombre}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
  nombreNuevaCategoria,
  setNombreNuevaCategoria,
  colorNuevaCategoria,
  setPrimeraPantalla,
  crearCategoria,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre de Categoria"
        style={styles.textInput}
        value={nombreNuevaCategoria}
        onChangeText={(nuevoTexto) => {
          setNombreNuevaCategoria(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Color de Categoria"
          editable={false}
          style={styles.textInput}
          value={colorNuevaCategoria}
        />
      </TouchableOpacity>
      <Button style={styles.modalButton} onPress={() => crearCategoria()}>
        Crear Categoria
      </Button>
    </>
  );
};

const SegundaPantalla = ({setColorNuevaCategoria, setPrimeraPantalla}) => {
  return (
    <>
      <ColorPicker
        onColorSelected={(color) => {
          setPrimeraPantalla(true);
          setColorNuevaCategoria(color);
        }}
        hideSliders={true}
        style={styles.container}
      />
      <Button
        style={styles.modalButton}
        onPress={() => setPrimeraPantalla(true)}>
        Volver
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
