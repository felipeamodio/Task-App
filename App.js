import React, {useState, useEffect, useRef} from 'react';
import {Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import Login from './src/pages/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  //mostrando a lista quando logas e manter
  useEffect(() => {
    function getUser(){
      if(!user){
        return;
      }
      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }
          setTasks(oldTasks => [...oldTasks,data])
        })
      })
    }
    getUser();
  }, [user])

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      const findTasks = tasks.filter(item => item.key !== key)
      setTasks(findTasks)
    })
  }

  function handleEdit(data){
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus();
  }

  if(!user){
    return <Login changeStatus={(user) => setUser(user)} />
  }

  function handleAdd(){
    if(newTask === ''){
      return;
    }

  // usuário quer editar uma tarefa
  if(key !== ''){
    firebase.database().ref('tarefas').child(user).child(key).update({
      nome: newTask
    })
    .then(() => {
      const taskIndex = tasks.findIndex(item => item.key === key)
      const taskClone = tasks;
      taskClone[taskIndex].nome = newTask
      
      setTasks([...taskClone])
    })
    Keyboard.dismiss();
    setNewTask('');
    setKey('');
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
          ref={inputRef}
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