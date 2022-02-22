import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {EvilIcons, Feather, MaterialIcons} from '@expo/vector-icons';

export default function TaskList({data, deleteItem, editItem}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.featherIcon} activeOpacity={0.7} onPress={() => deleteItem(data.key)}>
                <Feather name="trash" color="#FFFFFF" size={20} />
            </TouchableOpacity>

            <View style={styles.containerTextTask}>
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={styles.textTask}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
        marginLeft: 14,
        marginRight: 14
    },
    featherIcon: {
        marginRight: 10
    },
    textTask: {
        color: '#FFFFFF',
        paddingRight: 10,
        fontSize: 18,
        fontWeight: '600'
    },
    containerTextTask: {
        paddingRight: 10
    }
})