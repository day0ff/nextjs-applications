import {useEffect, useState} from "react";

const NewLocationMarker = ({address, location, setFlatDetail, map}) => {
    const [marker, setMarker] = useState();
    const [listener, setListener] = useState();

    const isOnTheMap = marker?.getMap();
    const {lat = 0, lng = 0} = location || {};

    const handleClickMarker = () => {
        setFlatDetail({address, location})
    }

    const setNewMarker = () => {
        const newMarker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(lat, lng),
            icon: '/png/add-icon.png',
            title: address,
            map
        })
        const newListener = newMarker.addListener('click', handleClickMarker);

        setListener(newListener);
        setMarker(newMarker);
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
        if (lat && lng) setNewMarker();
        else {
            marker.setMap(null);
            listener?.remove();
        }
    }, [isOnTheMap, lat, lng]);

    return null;
};

export default NewLocationMarker;