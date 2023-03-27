import React, {useState} from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

import TerrainIcon from '../../../public/svg/earth-line.svg';
import SatelliteIcon from '../../../public/svg/map-2-line.svg';

import Map from "./components/Map/Map";
import SchoolMarker from "./components/SchoolMarker/SchoolMarker";
import PreschoolPublicMarker from "./components/PreschoolPublicMarker/PreschoolPublicMarker";
import PreschoolPrivateMarker from "./components/PreschoolPrivateMarker/PreschoolPrivateMarker";
import FlatMarker from "./components/FlatMarker/FlatMarker";

import styles from "./styles.module.css";
import NewLocationMarker from "./components/NewLocationMarker/NewLocationMarker";

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

const GoogleMp = ({center, zoom, filters, flats, schools, preschoolsPublic, preschoolsPrivate, newMarker, setFlatDetail}) => {
    const [mapType, setMapType] = useState('terrain');

    const {flat: flatFilter, school: schoolFilter, preschool: preschoolFilter} = filters;
    const {public: preschoolPublicFilter, private: preschoolPrivateFilter} = preschoolFilter;

    const handleChangeTerrain = () => {

        if (mapType === 'terrain') setMapType('satellite')
        else setMapType('terrain')
    }

    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_API_KEY} render={render}>
            <Map center={center} zoom={zoom} type={mapType}>
                {preschoolsPublic?.map((preschool) => (
                    <PreschoolPublicMarker key={`preschool-public-${preschool.id}`} {...preschool}
                                           filter={preschoolPublicFilter}/>))}
                {preschoolsPrivate?.map((preschool) => (
                    <PreschoolPrivateMarker key={`preschool-private-${preschool.id}`} {...preschool}
                                            filter={preschoolPrivateFilter}/>))}
                {schools?.map((school) => (
                    <SchoolMarker key={`school-${school.id}`} {...school} filter={schoolFilter}/>))}
                {flats?.map((flat) => (<FlatMarker key={`flat-${flat.id}`} flat={flat} filter={flatFilter} setFlatDetail={setFlatDetail}/>))}
                {<NewLocationMarker {...newMarker} setFlatDetail={setFlatDetail}/>}
            </Map>
            <div className={styles.google_map__icon_wrapper} onClick={handleChangeTerrain}>
                {
                    mapType === 'terrain'
                        ? <TerrainIcon className={styles.google_map__icon}/>
                        : <SatelliteIcon className={styles.google_map__icon}/>
                }

            </div>
        </Wrapper>
    );
};

export default GoogleMp;
