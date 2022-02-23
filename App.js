import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import Login from './src/pages/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleDelete(key){
    console.log(key)
  }

  function handleEdit(data){
    console.log('Item clicado', data)
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)} />
  }

  function handleAdd(){
    if(newTask === ''){
      return;
    }

    //passando o child pra saber se o usuer está logado passando o id
    let tarefas = firebase.database().ref('tarefas').child(user)
    let chave = tarefas.push().key

    tarefas.child(chave).set({
      nome: newTask
    })
    .then(() => {
      const data = {
        key: chave,
        nome: newTask
      }
      setTasks(oldTasks => [...oldTasks, data])
    })

    Keyboard.dismiss();
    setNewTask('')
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>AppTarefas</Text>
      <View style={styles.containerTask}>
        <TextInput 
          style={styles.input}
          placeholder="Qual sua próxima tarefa?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Text style={styles.txtPlus}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    paddingHorizontal: 10,
    paddingTop: 25
  },
  title: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#5902EC'
  },
  containerTask: {
    flexDirection: 'row',
    marginTop: 30,
    padding: 14
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  btnAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 15,
    borderRadius: 4
  },
  txtPlus: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  }
})