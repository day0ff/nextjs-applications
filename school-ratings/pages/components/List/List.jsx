import React, {useState} from 'react';

import CloseIcon from '../../../public/svg/close-fill.svg';
import ListIcon from '../../../public/svg/list-unordered.svg';
import PhoneIcon from '../../../public/svg/phone-fill.svg';
import LinkIcon from '../../../public/svg/link-m.svg';
import EditIcon from '../../../public/svg/pencil-line.svg';

import styles from './styles.module.css';
import Image from "next/image";
import {getIcon} from "../GoogleMp/components/FlatMarker/FlatMarker";

const List = ({flats, setCenter, setFlatDetail}) => {
    const [isListOpen, setIsListOpen] = useState(false);

    const handleOpenList = () => {
        setIsListOpen(!isListOpen)
    }

    const handleSetCenter = (center) => {
        setTimeout(() => setCenter(center),0);
        setCenter(undefined)
        setFlatDetail(undefined);
    }

    const handleEdit = (flatDetails) => {
        setFlatDetail(flatDetails)
    }

    return (
        <>
            <div className={styles.list__icon_wrapper} onClick={handleOpenList}>
                <ListIcon className={styles.list__icon}/>
            </div>
            {isListOpen && (
                <div className={styles.list}>
                    <CloseIcon className={styles.list__icon_close} onClick={handleOpenList}/>
                    <div className={styles.list__container}>
                        <ul className={styles.list__list}>
                            {flats ? flats.map((flat) => {
                                const {id, rating, price, phone, address, link, location, available} = flat;

                                    return (
                                        <li key={id} className={styles.list__list_item}>
                                            {location.lat && location.lng
                                                ? (<Image className={styles.list__list_item_img}
                                                          src={getIcon(rating, available)}
                                                          width={20} height={32} alt='geolokalizacja'
                                                          onClick={handleSetCenter.bind(null, location)}/>)
                                                : (<span className={styles.list__list_item_no_img}></span>)}
                                            {price && (<span className={styles.list__list_item__price}>{price}zł</span>)}
                                            {phone && (
                                                <span className={styles.list__list_item__phone}>
                                                    <PhoneIcon className={styles.list__icon__phone} alt='telefon'/>
                                                    <span>{phone}</span>
                                                </span>
                                            )}
                                            {address && (<span>{address}</span>)}
                                            {link && (
                                                <a className={styles.list__list_item__link} target="_blank" href={link}>
                                                    <LinkIcon className={styles.list__icon__link} alt='link'/>
                                                </a>
                                            )}
                                            <EditIcon className={styles.list__icon__edit} alt='redagować'
                                                      onClick={handleEdit.bind(null, flat)}/>
                                        </li>
                                    )
                                }
                            ) : (
                                <li className={styles.list__list_item_empty}>Pusta lista...</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default List;