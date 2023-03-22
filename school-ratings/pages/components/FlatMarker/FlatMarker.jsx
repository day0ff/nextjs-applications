import {useEffect, useState} from "react";

const FlatMarker = ({id, address, rating, location, phone, price, previousPrice, available, map, link}) => {
    const [marker, setMarker] = useState();

    const getIcon = (rating) => {
        if (!available) return '/home-icon-gray.png';
        if (rating === 5) return '/home-icon-red.png';
        if (rating === 4) return '/home-icon-yellow.png';
        if (rating === 3) return '/home-icon-green.png';
        return '/home-icon-blue.png';
    }

    const newMarker = (loc) => {
        const newMarker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(loc?.lat, loc?.lng),
            icon: getIcon(rating),
            title: `${id}. ${rating} / ${price ?? ''} ${previousPrice ?? ''}\n${phone}\n${address}`,
            map
        })
        newMarker.addListener('click', () => {
            window.open(link, "_blank");
        });
        return marker;
    }

    useEffect(() => {
        if (map && !marker) {
            const {lat, lng} = location;

            if (!!lat && !!lng) setMarker(newMarker(location));
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [map, marker]);

    return null;
};

export default FlatMarker;