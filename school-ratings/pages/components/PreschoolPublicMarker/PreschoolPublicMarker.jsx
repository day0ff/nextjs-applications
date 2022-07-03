import {useEffect, useState} from "react";

const PreschoolPublicMarker = ({id, name, address, district, location, map}) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
        if (map && !marker) {
            setMarker(new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location?.lat, location?.lng),
                icon: '/preschool-icon-public.png',
                title: `${id}. ${name}\n${address}\n${district}`,
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

export default PreschoolPublicMarker;