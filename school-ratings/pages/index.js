import React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

import secrets from "../secrets/secrets.json";
import preschoolsPublic from "../data/preschools-public.json";
import preschoolsPrivate from "../data/preschools-private.json";
import schools from "../data/schools.json";

import Map from "./components/Map/Map";
import SchoolMarker from "./components/SchoolMarker/SchoolMarker";
import PreschoolPublicMarker from "./components/PreschoolPublicMarker/PreschoolPublicMarker";
import PreschoolPrivateMarker from "./components/PreschoolPrivateMarker/PreschoolPrivateMarker";
import FlatMarker from "./components/FlatMarker/FlatMarker";

import {MAP_OPTIONS} from "./constants";
import getSpreadsheetData from "../scripts/spreadsheet.mjs";

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

export default function Home({flats}) {
    const {center, zoom} = MAP_OPTIONS;

    return (
        <Wrapper apiKey={secrets.apiKey} render={render}>
            <Map center={center} zoom={zoom}>
                {preschoolsPublic?.map((preschool) => (<PreschoolPublicMarker key={`preschool-public-${preschool.id}`} {...preschool}/>))}
                {preschoolsPrivate?.map((preschool) => (<PreschoolPrivateMarker key={`preschool-private-${preschool.id}`} {...preschool}/>))}
                {schools?.map((school) => (<SchoolMarker key={`school-${school.id}`} {...school}/>))}
                {flats?.map((flat) => (<FlatMarker key={`flat-${flat.id}`} {...flat}/>))}
            </Map>
        </Wrapper>
    );
}

export const getServerSideProps = async function () {
    const flats = await getSpreadsheetData();

    return {props: {flats}}
}