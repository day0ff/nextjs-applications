import React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

import preschoolsPublic from "../data/preschools-public.json";
import preschoolsPrivate from "../data/preschools-private.json";
import schools from "../data/schools.json";

import Map from "./components/Map/Map";
import SchoolMarker from "./components/SchoolMarker/SchoolMarker";
import PreschoolPublicMarker from "./components/PreschoolPublicMarker/PreschoolPublicMarker";
import PreschoolPrivateMarker from "./components/PreschoolPrivateMarker/PreschoolPrivateMarker";
import FlatMarker from "./components/FlatMarker/FlatMarker";

import getSpreadsheetData from "../scripts/spreadsheet.mjs";

const render = (status) => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return null;
};

export default function Home({flats}) {
    const center = {lat: 52.24495943013511, lng: 21.01493118045693};
    const zoom = 12;

    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_API_KEY} render={render}>
            <Map center={center} zoom={zoom}>
                {preschoolsPublic?.map((preschool) => (<PreschoolPublicMarker key={`preschool-public-${preschool.id}`} {...preschool}/>))}
                {preschoolsPrivate?.map((preschool) => (<PreschoolPrivateMarker key={`preschool-private-${preschool.id}`} {...preschool}/>))}
                {schools?.map((school) => (<SchoolMarker key={`school-${school.id}`} {...school}/>))}
                {flats?.map((flat) => (<FlatMarker key={`flat-${flat.id}`} {...flat}/>))}
            </Map>
        </Wrapper>
    );
}

export const getServerSideProps = async function (context) {
    const flats = await getSpreadsheetData();

    return {props: {flats}}
}