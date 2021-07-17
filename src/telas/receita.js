import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, FlatList} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Header } from '../components/Header';
import api from '../services/api';

export default function Receita() {
  const [real, setReal] = useState("");
  const [receita, setReceita] = useState();

//   function ListaComponent(props){
  
//   return(
//       <View>
//           <TouchableOpacity onPress={() => {}}>
//               <View>
//                   <Text>Despesa</Text>
//                   <Text>{'Internet'}</Text>

//                   <Text>Valor</Text>
//                   <Text>{'100,00'}</Text>
//               </View>
//               <Feather name="info" size={28} color="#EB708A"/>
//           </TouchableOpacity>
//       </View>
//   );
// }

useEffect(() =>{
  loadApiContent();
},[]);

async function loadApiContent(){
let dataResponse = [];
api.get(
  `receita`,
)
.then((response) => {
  response.data.filter((item) => {
    dataResponse.push(item);    
  });
  setReceita(dataResponse)
 
})
.catch((e) => {
  console.log(e);
    if(!e.response){
      return Alert.alert('Erro');
    }
    return Alert.alert('Erro', e.response.data.erro);
});
}

function ListaComponent({...props}){
  return(
      <View style={styles.listaHeader}>
        <Text style={styles.listaTexto}>{props && props.data.nome}</Text>
        <Text style={styles.listaTexto}>{props && props.data.valor}</Text>
    </View>
  );
}

  return (
  <View style={styles.wrapper}>
      <Header texto="Receita" />
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <TextInput placeholderTextColor="#999" style={styles.input} placeholder="Receita" />
          <TextInputMask
              type={'money'}
              options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: ''
              }}
              value={real}
              onChangeText={(text => setReal(text))}
              autoCapitalize="none"
              placeholder="R$ 0,00"
              placeholderTextColor="#999"
              keyboardType='decimal-pad'
              style={styles.input}
              />
          <TouchableOpacity style={styles.botao} onPress={() => { }}>
            <Text style={styles.botaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
            <View style={styles.listaHeader}>
              <Text style={styles.listaTexto}>Receitas</Text>
              <Text style={styles.listaTexto}>R$</Text>
            </View>
            {receita &&
                <FlatList
                    data={receita}
                    ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>Não existe nenhuma receita.</Text>}
                    //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    //onEndReached={loadClientes}
                    //onEndReachedThreshold={0.2}            
                    //ListFooterComponent={<RenderFooter value={loading} refreshing={refreshing}/>}
                    keyExtractor={receita => String(receita.id)}
                    renderItem={({ item } ) => <ListaComponent data={item} />} 
                />
              }
        
        </View>
  </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#414141'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titulo: {
    color: '#F0F0F5',
    fontSize: 28,
    fontWeight: 'bold',
  },
  conteudo: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'pink'
  },
  input: {
    height: 55,
    alignSelf: "stretch",
    backgroundColor: '#525252',
    borderRadius: 4,
    width: 240,
    paddingLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginBottom: 25
  },
  botao: {
    width: 240,
    height: 55,
    backgroundColor: '#EC625F',
    marginTop: 12,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 50
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },

  listaHeader:{
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: 300,
    // backgroundColor: 'blue',
    paddingBottom: 3,
    marginBottom: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },

  listaTexto:{
    color: '#f0f0f5',
    fontSize: 14,
  }
});
