import {useEffect, useState} from "react";

export const flatRating = {
    excellent: 6,
    good: 5,
    average: 4,
    fair: 3,
    poor: 2,
}

export const getIcon = (rating, available) => {
    if (!available) return '/png/home-icon-gray.png';
    if (rating === flatRating.excellent) return '/png/home-icon-red.png';
    if (rating === flatRating.good) return '/png/home-icon-red.png';
    if (rating === flatRating.average) return '/png/home-icon-yellow.png';
    if (rating === flatRating.fair) return '/png/home-icon-green.png';
    return '/png/home-icon-blue.png';
}

const getIsFlatFiltered = (rating, available, filter) => {
    if (!available) return !filter.unavailable;

    const key = Object.keys(flatRating).find(key => flatRating[key] === rating) || 'poor';

    return !filter[key];
}

const FlatMarker = ({flat, map, filter, setFlatDetail}) => {
    const [marker, setMarker] = useState();
    const [listener, setListener] = useState();

    const {address, rating = 0, location, phone, price, available} = flat;
    const isOnTheMap = marker?.getMap();
    const isFiltered = getIsFlatFiltered(rating, available, filter)
    const {lat, lng} = location || {};

    const handleClickMarker = () => {
        setFlatDetail(flat)
    }

    const newMarker = (lat, lng) => {
        const newMarker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(Number(lat), Number(lng)),
            icon: getIcon(rating, available),
            title: `${rating}★ ${price ? `${price}zl` : ''}\n${phone}\n${address}`,
            map
        })
        const newListener = newMarker.addListener('click', handleClickMarker);

        setListener(newListener)

        setMarker(newMarker);
    }

    useEffect(() => {
        if (map && !marker && !!lat && !!lng) {
            newMarker(location);
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [map, marker]);

    useEffect(() => {
        if (!marker) return;
        if (isFiltered) {
            marker.setMap(null);
            listener?.remove();
        } else if (!!lat && !!lng) newMarker(lat, lng);
    }, [isOnTheMap, isFiltered, rating, available]);

    return null;
};

export default FlatMarker;