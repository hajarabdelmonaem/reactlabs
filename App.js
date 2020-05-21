import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons} from '@expo/vector-icons';

export default function App() {
  const [val, setValue] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [listItems, setList] = React.useState([]);
  const [keyState, setKey] = React.useState('');

  React.useEffect(()=>{
    console.log(keyState);
    if(keyState == 'add'){
      list(0);
    }
    else if (keyState === 'all'){
      list(0);
    }
    else if (keyState === 'done'){
      list(1);
    }
    else if (keyState === 'active'){
      list(2);
    }

      
  },[items, keyState])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: val,
        state: 0
      }
    ]);
    setValue("");
    setKey('add');
    console.log(items);
  };
  
  const check = (i) => {
    let newList = items.map((item)=>{
      if(item.id === i){
        item.state = 1;
      }
      return item;
    });
    setItems(newList);
    console.log(items[i]);
  }

  const list = (key) => {
    if (key === 0){
      setKey('all');
      setList([...items]);
    }
    else if(key === 1){
      setKey('done');
      const arr1 = items.map((item)=>{
        if(item.state){
          return item;
        }
        return 0;
      })
      setList([...arr1]);
    }
    else{
      setKey('active');
      const arr2 = items.map((item)=>{
        if(!item.state){
          return item;
        }
        return 0;
      })
      setList([...arr2]);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginTop: 100}}
        data={listItems}
        renderItem={({item,index})=>{
          if (item){
            return (
              <View style={{flexDirection: 'row', marginTop:10}} key={index}>
                <TouchableOpacity activeOpacity={.8} onPress={()=>{check(item.id)}}>
                  {item.state
                    ? <FontAwesome name="check-square-o" size={24} color="orange" />
                    : <MaterialIcons name="check-box-outline-blank" size={24} color="orange" />
                  }
                </TouchableOpacity>
                <Text style={item.state ? styles.list2 : styles.list1}>{item.value}</Text>
              </View>
            )
          }  
      }}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.text1}> TODO LIST</Text>
            <Text style={styles.text2}> <Text style={{fontWeight:"bold"}}>Write</Text>what you need to do  </Text>
            <View style={styles.header}>
              <View style={styles.row}>
                <TextInput
                  onChangeText={text => setValue(text)}
                  value={val}
                  style={styles.input}
                />
                <TouchableOpacity activeOpacity={.6} onPress={()=>{addItem()}}>
                  <AntDesign name="pluscircle" size={24} color="orange" />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={keyState=='all'? styles.clicked : styles.button} activeOpacity={.8} onPress={()=>{list(0)}}>
                  <Text>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={keyState=='active'? styles.clicked : styles.button} activeOpacity={.8} onPress={()=>{list(2)}}>
                  <Text>ACTIVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={keyState=='done'? styles.clicked : styles.button} activeOpacity={.8} onPress={()=>{list(1)}}>
                  <Text>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        // ListFooterComponent={ <Text style={{color:"orange"}}> footer</Text>}
        ListEmptyComponent={<Text style={styles.list}>Empty</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    // borderColor: 'white',
    width: 300,
    // borderWidth: 1
  },
  text1: {
    color: 'orange',
    fontSize: 32,
    fontWeight: "bold"
  },
  text2:{
    color: '#fff',
    fontSize: 14,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
    flexGrow: 4,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  row:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexGrow: 1,
    flexBasis: 90,
    backgroundColor: 'white',
    borderRadius: 30,
    height: 30,
    margin: 3,
    alignItems: "center",
    justifyContent: 'center',

  },
  clicked:{
    flexGrow: 1,
    flexBasis: 90,
    backgroundColor: 'orange',
    borderRadius: 30,
    height: 30,
    margin: 3,
    alignItems: "center",
    justifyContent: 'center',
  },
  list1: {
    color: 'orange',
    fontSize: 20,
  },
  list2: {
    color: 'orange',
    fontSize: 20,
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  }
});
