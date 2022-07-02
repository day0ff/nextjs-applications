import {useEffect, useState} from "react";

const FlatMarker = ({id, address, rating, location, phone, price, previousPrice, map}) => {
    const [marker, setMarker] = useState();

    const getIcon = (rating) => {
        if (rating === 5) return '/home-icon-red.png';
        if (rating === 4) return '/home-icon-yellow.png';
        if (rating === 3) return '/home-icon-green.png';
        return '/home-icon-blue.png';
    }

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location?.lat, location?.lng),
                icon: getIcon(rating),
                title: `${id}. ${rating} / ${price ?? ''} ${previousPrice ?? ''}\n${phone}\n${address}`,
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

export default FlatMarker;