import {useEffect, useState} from "react";

const SchoolMarker = ({position, name, address, rating, location, map}) => {
    const [marker, setMarker] = useState();

    const getIcon = (rating) => {
        if (+rating >= 87) return '/school-icon-red.png';
        if (+rating >= 75) return '/school-icon-yellow.png';
        if (+rating >= 60) return '/school-icon-green.png';
        return '/school-icon-blue.png';
    }

    useEffect(() => {
        if (map && !marker) {
            setMarker(new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location?.lat, location?.lng),
                icon: getIcon(rating),
                title: `${position} / ${rating}\n${name}\n${address}`,
                map
            }));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [map, marker]);

    return null;
};

export default SchoolMarker;