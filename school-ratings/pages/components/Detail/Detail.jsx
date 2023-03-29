import React, {useEffect, useState} from 'react';

import CloseIcon from '../../../public/svg/close-fill.svg';
import MapPinIcon from '../../../public/svg/map-pin-2-fill.svg';
import PhoneIcon from '../../../public/svg/phone-fill.svg';
import LinkIcon from '../../../public/svg/link-m.svg';
import ParkingIcon from '../../../public/svg/parking.svg';
import MetroIcon from '../../../public/svg/metro.svg';
import ParkIcon from '../../../public/svg/park.svg';
import BathroomIcon from '../../../public/svg/bathroom.svg';
import SchoolIcon from '../../../public/svg/school.svg';
import PreschoolIcon from '../../../public/svg/teddy-bear.svg';
import HomeIcon from '../../../public/svg/home-heart-fill.svg';
import DeleteIcon from '../../../public/svg/delete-bin-2-fill.svg';
import SaveIcon from '../../../public/svg/save-fill.svg';
import NextIcon from '../../../public/svg/arrow-right-line.svg';

import {flatRating} from "../GoogleMp/components/FlatMarker/FlatMarker";

import styles from './styles.module.css';

const addRatingColorStyle = (style, rating, available) => {
    if (!available) return `${style} ${styles.not_available}`;
    if (rating === flatRating.excellent) return `${style} ${styles.excellent}`;
    if (rating === flatRating.good) return `${style} ${styles.good}`;
    if (rating === flatRating.average) return `${style} ${styles.average}`;
    if (rating === flatRating.fair) return `${style} ${styles.fair}`;
    return `${style} ${styles.poor}`;
}

const Detail = ({flat, setFlatDetail, deleteNewMarker, deleteFlat, createNewFlat, updateFlat, nextFlat}) => {
    const [isPending, setIsPending] = useState(false);
    const [details, setDetails] = useState(flat);

    const {
        id,
        address,
        phone,
        price,
        location,
        parking = 0,
        bathroom = 0,
        park = 0,
        metro = 0,
        school = 0,
        preschool = 0,
        rating = 0,
        available,
        link
    } = details;
    const {lat, lng} = location;

    const handleClose = () => {
        setFlatDetail(undefined);
    }

    const handleToggleKey = (key) => {
        const value = details[key];

        setDetails({...details, [key]: !value});
    }

    const handleChangeInput = (event) => {
        const {name, value} = event.target

        setDetails({...details, [name]: value});
    }

    const handleChangeLocation = (event) => {
        const {name, value} = event.target

        setDetails({...details, location: {...location, [name]: Number(value)}});
    }

    const handleNextFlat = () => {
        nextFlat(id);
    }

    const handleDelete = () => {
        if (isPending) return;

        if (!id) {
            deleteNewMarker();

            return;
        }

        setIsPending(true);

        fetch('/api/delete', {
            method: "POST",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => deleteFlat(id)).finally(() => setIsPending(false));
    }

    const handleUpdate = () => {
        if (isPending) return;

        setIsPending(true);

        if (!id) {
            fetch('/api/create', {
                method: "POST",
                body: JSON.stringify({...details, visible: true}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(({newFlat}) => {
                createNewFlat(newFlat)
            }).finally(() => setIsPending(false));

            return;
        }

        fetch('/api/update', {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            updateFlat(details)
        }).finally(() => setIsPending(false));
    }

    useEffect(() => {
        const newRating = parking + bathroom + park + metro + school + preschool;

        setDetails({...details, rating: newRating})
    }, [parking, bathroom, park, metro, school, preschool]);

    useEffect(() => {
        setDetails(flat)
    }, [flat]);

    return (
        <>
            <div className={styles.detail__background} onClick={handleClose}>{null}</div>
            <div className={styles.detail__top}>
                <CloseIcon className={styles.detail__icon_close} onClick={handleClose}/>
                <div className={styles.detail__item}>
                    <input className={styles.detail__input} type="search" value={address}
                           name="address" onChange={handleChangeInput} title="adres mieszkania"
                           placeholder="adres mieszkania"/>
                    <MapPinIcon className={styles.detail__icon_address}/>
                </div>
                <div className={styles.detail__item_info}>
                    <span className={styles.detail__item__price}>
                        <span>zl</span>
                        <input className={styles.detail__input} type="tel" value={price} pattern="\d*"
                               name="price" onChange={handleChangeInput} title="cena" placeholder="cena"/>
                    </span>
                    <span className={styles.detail__item__phone}>
                        <PhoneIcon className={styles.detail__icon_phone}/>
                        <input className={styles.detail__input} type="tel" name="phone" value={phone}
                               onChange={handleChangeInput} title="telefon" placeholder="telefon"/>
                    </span>
                </div>
                <div className={styles.detail__item_rating}>
                    <span title={available ? 'aktualne' : 'nie aktualne'}>
                        <HomeIcon className={addRatingColorStyle(styles.detail__icon_rating, rating, available)}
                                  onClick={handleToggleKey.bind(null, 'available')}/>
                    </span>
                    <span>Ranking</span>
                    <span>{rating}</span>
                    <span title="następne mieszkanie">
                        <NextIcon className={styles.detail__icon_next} onClick={handleNextFlat}/>
                    </span>
                </div>
            </div>
            <div className={styles.detail__left}>
                <div className={styles.detail__rating_icons}>
                    <span title="parking">
                        <ParkingIcon
                            className={parking ? styles.detail__icon_parking__active : styles.detail__icon_rating}
                            onClick={handleToggleKey.bind(null, 'parking')}/>
                    </span>
                    <span title="metro">
                    <MetroIcon className={metro ? styles.detail__icon_metro__active : styles.detail__icon_rating}
                               onClick={handleToggleKey.bind(null, 'metro')}/>
                    </span>
                    <span title="park">
                    <ParkIcon className={park ? styles.detail__icon_park__active : styles.detail__icon_rating}
                              onClick={handleToggleKey.bind(null, 'park')}/>
                    </span>
                    <span title="łazienka">
                    <BathroomIcon
                        className={bathroom ? styles.detail__icon_bathroom__active : styles.detail__icon_rating}
                        onClick={handleToggleKey.bind(null, 'bathroom')}/>
                    </span>
                    <span title="szkoła">
                    <SchoolIcon className={school ? styles.detail__icon_school__active : styles.detail__icon_rating}
                                onClick={handleToggleKey.bind(null, 'school')}/>
                    </span>
                    <span title="przedszkole">
                        <PreschoolIcon
                            className={preschool ? styles.detail__icon_preschool__active : styles.detail__icon_rating}
                            onClick={handleToggleKey.bind(null, 'preschool')}/>
                    </span>
                </div>
            </div>
            <div className={styles.detail__overlay}></div>
            <div className={styles.detail__bottom}>
                <div className={styles.detail__item}>
                    <input className={styles.detail__input} type="url" placeholder="link" value={link} name="link"
                           title="link" onChange={handleChangeInput}/>
                    {link ? (
                        <a target="_blank" href={link} title="link" rel="noreferrer">
                            <LinkIcon className={styles.detail__icon_link__active}/>
                        </a>
                    ) : (<LinkIcon className={styles.detail__icon_link}/>)}

                </div>
            </div>
            <div className={styles.detail__right}>
                <div className={styles.detail__item}>
                    <input className={styles.detail__input} type="tel" value={lat} step="0.0001"
                           name="lat" title="latitude" onChange={handleChangeLocation} placeholder="lat"/>
                    <input className={styles.detail__input} type="tel" value={lng} step="0.0001"
                           name="lng" title="longitude" onChange={handleChangeLocation} placeholder="lng"/>
                </div>
                <div className={styles.detail__item_controls}>
                    <span title="usunąć">
                        <DeleteIcon className={styles.detail__icon_delete} onClick={handleDelete}/>
                    </span>
                    <span title="zapisać">
                        <SaveIcon className={styles.detail__icon_save} onClick={handleUpdate}/>
                    </span>
                </div>
            </div>
            {isPending && <div className={styles.detail__pending}>Request. . .</div>}
        </>
    );
};

export default Detail;