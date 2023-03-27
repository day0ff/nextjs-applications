import {useEffect, useState} from "react";

const PreschoolPublicMarker = ({id, name, address, district, location, map, filter}) => {
    const [marker, setMarker] = useState();

    const isOnTheMap = marker?.getMap();

    const setNewMarker = () => {
        setMarker(new window.google.maps.Marker({
            position: new window.google.maps.LatLng(location?.lat, location?.lng),
            icon: '/png/preschool-icon-public.png',
            title: `${id}. ${name}\n${address}\n${district}`,
            map
        }));
    };

    useEffect(() => {
        if (map && !marker) {
            setNewMarker()
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [map, marker]);

    useEffect(() => {
        if (!marker) return;
        if (filter) setNewMarker();
        else  marker.setMap(null);
    }, [isOnTheMap, filter]);

    return null;
};

export default PreschoolPublicMarker;