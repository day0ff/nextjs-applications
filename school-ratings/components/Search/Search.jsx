import React, {useEffect, useState} from 'react';

import useDebounce from "../../hooks/useDebounce";

import SearchIcon from '../../public/svg/search-line.svg';
import MapPinIcon from '../../public/svg/map-pin-add-fill.svg';

import styles from './styles.module.css';

const Search = ({setNewMarker}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [address, setAddress] = useState();
    const [location, setLocation] = useState();

    const debouncedAddress = useDebounce(address, 1500)

    const handleOpenSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
    }

    const handleSetLocation = (newLocation) => {
        const {lat, lng} = newLocation || {};

        if (lat && lng) setNewMarker({address, location: newLocation});
        else setNewMarker(undefined);

        setLocation(newLocation);
    }

    const handleShowNewMarker = () => {
        const {lat, lng} = location || {};

        if (address && lat && lng) setTimeout(() => setNewMarker({address, location}), 0);

        setNewMarker(undefined);
    }

    const getMapPinStyles = () => {
        const {lat, lng} = location || {};

        if (lat && lng) return styles.search__icon_map_pin__active;

        return styles.search__icon_map_pin;
    }

    useEffect(() => {
        if (!address?.trim()) {
            setLocation(undefined);

            return;
        }

        fetch('/api/search', {
            method: "POST",
            body: JSON.stringify({address}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => handleSetLocation(res))
    }, [debouncedAddress]);

    return (
        <>
            <div className={styles.search__icon_wrapper} onClick={handleOpenSearch}>
                <SearchIcon className={styles.search__icon}/>
            </div>
            {isSearchOpen && (
                <div className={styles.search}>
                    <input className={styles.search__input} type="search" value={address} placeholder="adres mieszkania"
                           onChange={handleChangeAddress}/>
                    <MapPinIcon className={getMapPinStyles()} onClick={handleShowNewMarker}/>
                </div>
            )}
        </>
    );
};

export default Search;