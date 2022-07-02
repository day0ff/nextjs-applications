import React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

import * as secrets from "../secrets/secrets.json";
import * as db from "../db/db.json";

import Map from "./components/Map/Map";
import SchoolMarker from "./components/SchoolMarker/SchoolMarker";
import FlatMarker from "./components/FlatMarker/FlatMarker";

import {MAP_OPTIONS} from "./constants";

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

export default function Home() {
    const {center, zoom} = MAP_OPTIONS;
    const {schools, flats} = db;
    return (
        <Wrapper apiKey={secrets.apiKey} render={render}>
            <Map center={center} zoom={zoom}>
                {schools?.map((school) => (<SchoolMarker key={`school-${school.id}`} {...school}/>))}
                {flats?.filter(({hidden})=> !hidden).map((flat) => (<FlatMarker key={`flat-${flat.id}`} {...flat}/>))}
            </Map>
        </Wrapper>
    );
}
