import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { sharedStorage } from '@/hooks/SharedStorage';

const Index: React.FC = () => {
    const [counter, setCounter] = useState<number>(0);
    useEffect(() => {
        const loadCount = async () => {
            const savedCount = await sharedStorage.getItem('count');
            setCounter(parseInt(savedCount || '0'));
        };
        loadCount();
    }, []);

    const updateCount = async (newCount: number) => {
        setCounter(newCount);
        await sharedStorage.setItem('count', newCount.toString());
    };

    const handleOnDecrement = () => {
        setCounter(counter - 1)
    }

    const handleOnIncrement = () => {
        setCounter(counter + 1)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Counter Widget App</Text>
            <View style={styles.counterContainer}>
                <Text style={styles.counterValue}>{counter}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleOnDecrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleOnIncrement}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.hint}>Check your widgets to see the counter there too!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    counterContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        padding: 20,
        width: 200,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
    },
    counterValue: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 25,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    hint: {
        marginTop: 40,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default Index;
