import { NativeModules, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SharedStorage = NativeModules.SharedStorage;

interface ISharedStorage {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string>;
}

export const sharedStorage: ISharedStorage = {
    setItem: async (key, value) => {
        if (Platform.OS === 'ios') {
            await SharedStorage.setItem(key, value);
        } else {
            await AsyncStorage.setItem(key, value);
        }
    },
    getItem: async (key) => {
        if (Platform.OS === 'ios') {
            return SharedStorage.getItem(key);
        }
        return AsyncStorage.getItem(key);
    }
};