const flat = {
    unavailable: true,
    poor: false,
    fair: true,
    average: true,
    good: true,
    excellent: true,
}

const school = {
    poor: false,
    fair: true,
    average: true,
    good: true,
    excellent: true,
}

const preschool = {
    public: true,
    private: true,
}

export const defaultFiltersState = {
    flat,
    school,
    preschool
}

const LOCAL_STORAGE_KEY = 'warsaw-school-ratings';

const checkSerialization = (data) =>
    String(Object.keys(defaultFiltersState)) === String(Object.keys(data)) &&
    String(Object.keys(defaultFiltersState.flat)) === String(Object.keys(data.flat)) &&
    String(Object.keys(defaultFiltersState.school)) === String(Object.keys(data.school)) &&
    String(Object.keys(defaultFiltersState.preschool)) === String(Object.keys(data.preschool))


export const getLocalStorageData = () => {
    try {
        const localData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));

        if (!checkSerialization(localData)) throw new Error();

        return localData;
    } catch (error) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultFiltersState));

        return defaultFiltersState;
    }
}

export const setLocalStorageData = (data) => {
    try {
        if (!checkSerialization(data)) throw new Error();

        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultFiltersState));
    }
}