import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        alert('teste')
    }

    return(
        <SafeAreaView style={styles.container}>
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

            <TouchableOpacity style={styles.handleLogin} activeOpacity={0.7} onPress={handleLogin}>
                <Text style={styles.textLogin}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.handleAccount} activeOpacity={0.7}>
                <Text style={styles.textAccount}>Criar uma conta</Text>
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
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2AA9E0',
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