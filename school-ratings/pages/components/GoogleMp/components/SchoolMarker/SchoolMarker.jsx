import {useEffect, useState} from "react";

const schoolRating = {
    excellent: 87,
    good: 75,
    average: 60,
    fair: 0
}

const getIcon = (rating) => {
    if (+rating >= schoolRating.excellent) return '/png/school-icon-red.png';
    if (+rating >= schoolRating.good) return '/png/school-icon-yellow.png';
    if (+rating >= schoolRating.average) return '/png/school-icon-green.png';
    return '/png/school-icon-blue.png';
}

const getIsSchoolFiltered = (rating, filter) => {
    const key = Object.keys(schoolRating).find(key => schoolRating[key] <= rating)

    return !filter[key];
}

const SchoolMarker = ({position, name, address, rating, location, map, filter}) => {
    const [marker, setMarker] = useState();

    const isOnTheMap = marker?.getMap();
    const isFiltered = getIsSchoolFiltered(rating, filter);

    const setNewMarker = () => {
        setMarker(new window.google.maps.Marker({
            position: new window.google.maps.LatLng(location?.lat, location?.lng),
            icon: getIcon(rating),
            title: `${position} / ${rating}\n${name}\n${address}`,
            map
        }));
    };

    useEffect(() => {
        if (map && !marker) {
            setNewMarker();
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [map, marker]);

    useEffect(() => {
        if (!marker) return;
        if (isFiltered) marker.setMap(null);
        else setNewMarker();
    }, [isOnTheMap, isFiltered]);

    return null;
};

export default SchoolMarker;