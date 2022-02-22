import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

import firebase from '../../services/firebaseConnection';
require('firebase/auth')

export default function Login(){
    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        if(type === 'login'){
            //Fazendo o login
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user.user)
            })
            .catch((error) => {
                console.log(error);
                alert('Ops, deu algum erro')
                return;
            })
        }else{
            //Cadastro do usuário
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user.user)
            })
            .catch((error) => {
                console.log(error)
                alert('Ops, deu algum erro!')
                return;
            })
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerAnimation}>
                <LottieView 
                    source={require('../../assets/tasks.json')}
                    autoPlay={true}
                    loop={true}
                    style={{width: 600, height: 200}}
                />
            </View>

            <View style={styles.containerInput}>
                <TextInput 
                    placeholder="Seu e-mail"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput 
                    placeholder="*********" 
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <TouchableOpacity style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#2AA9E0' : '#141414'}]} activeOpacity={0.7} onPress={handleLogin}>
                <Text style={styles.textLogin}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.handleAccount} 
                              activeOpacity={0.7} 
                              onPress={() => setType(type => type === 'login' ? 'Cadastrar' : 'login')}>
                <Text style={styles.textAccount}>
                    {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#F2F6FC',
        paddingHorizontal: 10
    },
    containerAnimation: {
        marginTop: 40,
        alignItems: 'center'
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        height: 45,
        width: '95%',
        marginLeft: 10,
        marginTop: 20
    },
    textLogin: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#DCDCDC'
    },
    containerInput: {
        paddingTop: 40,
        paddingHorizontal: 10
    },
    handleAccount: {
        alignItems: 'center',
        marginTop: 15
    },
    textAccount: {
        fontSize: 15,
        fontWeight: '500',
        color: '#141414'
    }
})