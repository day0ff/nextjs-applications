import {useEffect, useState} from "react";

const SchoolMarker = ({position, name, address, rating, location, map}) => {
    const [marker, setMarker] = useState();

    const getIcon = (rating) => {
        if (+rating >= 87) return '/icon-red.png';
        if (+rating >= 75) return '/icon-yellow.png';
        if (+rating >= 60) return '/icon-green.png';
        return '/icon-blue.png';
    }

    useEffect(() => {
        if (!marker) {
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
    }, [marker]);

    return null;
};

export default SchoolMarker;