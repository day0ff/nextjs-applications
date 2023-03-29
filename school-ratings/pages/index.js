import React, {useEffect, useState} from "react";

import {getSpreadsheetData} from "../scripts/spreadsheet.mjs";
import {getLocalStorageData, setLocalStorageData} from "../scripts/localStorage.mjs";

import preschoolsPublic from "../data/preschools-public.json";
import preschoolsPrivate from "../data/preschools-private.json";
import schools from "../data/schools.json";

import GoogleMp from "../components/GoogleMp/GoogleMp";
import Filters from "../components/Filters/Filters";
import Search from "../components/Search/Search";
import List from "../components/List/List";
import Detail from "../components/Detail/Detail";

const centerDefault = {lat: 52.24495943013511, lng: 21.01493118045693};
const zoomDefault = 12;

export default function Home({initialFlats}) {
    const [flats, setFlats] = useState(initialFlats);
    const [center, setCenter] = useState(centerDefault);
    const [filters, setFilters] = useState();
    const [newMarker, setNewMarker] = useState();
    const [flatDetail, setFlatDetail] = useState();

    const handleSetCenter = (location) => {
        setCenter(location);
    }

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setLocalStorageData(newFilters);
    }

    const handleSetNewFlatDetail = (newFlatDetail) => {
        const {location} = newFlatDetail || {};
        const {lat, lng} = location || {};

        setFlatDetail(newFlatDetail);

        setCenter(undefined);
        if (lat && lng) setTimeout(() => setCenter(location), 0);
    }

    const handleSetNewMarker = (newMarker) => {
        const {location} = newMarker || {};

        setNewMarker(newMarker);
        setCenter(location);
        setFlatDetail(undefined);
    }

    const handleDeleteNewMarker = () => {
        setNewMarker(undefined);
        setFlatDetail(undefined);
    }

    const handleDelete = (deletedItemId) => {
        const newFlats = flats.filter(({id}) => id !== deletedItemId) || [];

        setFlats([...newFlats]);
        setFlatDetail(undefined);
    }

    const handleCreateNewFlat = (newFlatData) => {
        setNewMarker(undefined);
        setFlatDetail(newFlatData);
        setFlats([...flats, newFlatData]);
    }

    const handleUpdate = (newFlatData) => {
        setFlats(currentFlats => {
            const newFlats = currentFlats.map((flat) => flat.id === newFlatData.id ? newFlatData : flat) || [];

            return [...newFlats];
        });
    }

    const handleNextFlat = (currentId) => {
        let index = flats?.findIndex(({id}) => id === currentId) ?? -1;

        if (index === -1 || index + 1 >= flats.length) index = 0;
        else index++;


        const newFlat = flats[index] || {};
        const {location} = newFlat || {}

        setFlatDetail(newFlat);
        setCenter(location);
    }

    useEffect(() => {
        setFlats(initialFlats);
    }, [initialFlats]);

    useEffect(() => {
        if (filters) return;
        const localStorageData = getLocalStorageData();

        setFilters(localStorageData);
    }, []);

    return filters && (
        <>
            <GoogleMp center={center} zoom={zoomDefault} filters={filters} flats={flats}
                      preschoolsPublic={preschoolsPublic} preschoolsPrivate={preschoolsPrivate}
                      schools={schools} newMarker={newMarker} setFlatDetail={handleSetNewFlatDetail}/>
            {flatDetail &&
                <Detail flat={flatDetail} setFlatDetail={handleSetNewFlatDetail} deleteNewMarker={handleDeleteNewMarker}
                        createNewFlat={handleCreateNewFlat} updateFlat={handleUpdate} deleteFlat={handleDelete}
                        nextFlat={handleNextFlat}/>}
            <Search setNewMarker={handleSetNewMarker}/>
            <Filters filters={filters} setFilters={handleSetFilters}/>
            <List flats={flats} setCenter={handleSetCenter} setFlatDetail={handleSetNewFlatDetail}/>
        </>
    );
}

export const getServerSideProps = async function (context) {
    const data = await getSpreadsheetData();
    const initialFlats = data?.filter(({visible}) => visible) || [];

    return {props: {initialFlats}}
}