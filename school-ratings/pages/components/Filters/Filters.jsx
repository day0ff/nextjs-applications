import React, {useState} from 'react';
import Image from "next/image";

import FilterIcon from '../../../public/svg/sound-module-fill.svg';
import CloseIcon from '../../../public/svg/close-fill.svg';

import styles from './styles.module.css';

const getImageStyle = value => value ? styles.filters__list_item_img__active : styles.filters__list_item_img;

const Filters = ({filters, setFilters}) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const {flat, school, preschool} = filters;

    const handleOpenFilters = () => {
        setIsFiltersOpen(currentIsFiltersOpen => !currentIsFiltersOpen)
    }

    const handleClickGood = () => {
        setFilters({...filters, flat: {...flat, good: !flat.good, excellent: !flat.excellent}})
    }

    const handleClickFlat = (type) => {
        setFilters({...filters, flat: {...flat, [type]: !flat[type]}})
    }

    const handleClickSchool = (type) => {
        setFilters({...filters, school: {...school, [type]: !school[type]}})
    }

    const handleClickPreschool = (type) => {
        setFilters({...filters, preschool: {...preschool, [type]: !preschool[type]}})
    }

    return (
        <>
            {/*{isFiltersOpen && <div className={styles.filters__background} onClick={handleOpenFilters}>{null}</div>}*/}
            <div className={styles.filters__icon_wrapper} onClick={handleOpenFilters}>
                <FilterIcon className={styles.filters__icon}/>
            </div>
            {isFiltersOpen && (
                <div className={styles.filters}>
                    <CloseIcon className={styles.filters__icon_close} onClick={handleOpenFilters}/>
                    <ul className={styles.filters__list}>
                        <span className={styles.filters__list_title}>
                            Mieszkanie
                        </span>
                        <li className={styles.filters__list_item} onClick={handleClickFlat.bind(null, 'poor')}>
                            <Image
                                className={getImageStyle(flat.poor)}
                                src='/png/home-icon-blue.png' width={20} height={32} alt='mieszkanie'/>
                            <span>2</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickFlat.bind(null, 'fair')}>
                            <Image className={getImageStyle(flat.fair)} src='/png/home-icon-green.png'
                                   width={20}
                                   height={32} alt='mieszkanie'/>
                            <span>3</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickFlat.bind(null, 'average')}>
                            <Image className={getImageStyle(flat.average)} src='/png/home-icon-yellow.png'
                                   width={20} height={32} alt='mieszkanie'/>
                            <span>4</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickGood}>
                            <Image className={getImageStyle(flat.good)} src='/png/home-icon-red.png'
                                   width={20} height={32}
                                   alt='mieszkanie'/>
                            <span>5+</span>
                        </li>
                    </ul>
                    <ul className={styles.filters__list}>
                        <span className={styles.filters__list_title}>
                            Mieszkanie nie aktualne
                        </span>
                        <li className={styles.filters__list_item} onClick={handleClickFlat.bind(null, 'unavailable')}>
                            <Image className={getImageStyle(flat.unavailable)} src='/png/home-icon-gray.png'
                                   width={20} height={32} alt='mieszkaniee nie aktualne'/>
                        </li>
                    </ul>
                    <hr className={styles.filters__hr}/>
                    <ul className={styles.filters__list}>
                        <span className={styles.filters__list_title}>
                            Szkoła Podstawowa
                        </span>
                        <li className={styles.filters__list_item} onClick={handleClickSchool.bind(null, 'fair')}>
                            <Image className={getImageStyle(school.fair)} src='/png/school-icon-blue.png'
                                   width={20} height={32} alt='szkoła podstawowa'/>
                            <span>2</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickSchool.bind(null, 'average')}>
                            <Image className={getImageStyle(school.average)} src='/png/school-icon-green.png'
                                   width={20} height={32} alt='szkoła podstawowa'/>
                            <span>3</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickSchool.bind(null, 'good')}>
                            <Image className={getImageStyle(school.good)} src='/png/school-icon-yellow.png'
                                   width={20} height={32} alt='szkoła podstawowa'/>
                            <span>4</span>
                        </li>
                        <li className={styles.filters__list_item} onClick={handleClickSchool.bind(null, 'excellent')}>
                            <Image className={getImageStyle(school.excellent)} src='/png/school-icon-red.png'
                                   width={20} height={32} alt='szkoła podstawowa'/>
                            <span>5</span>
                        </li>
                    </ul>
                    <ul className={styles.filters__list}>
                        <span className={styles.filters__list_title}>
                            Przedszkole Prywatne
                        </span>
                        <li className={styles.filters__list_item} onClick={handleClickPreschool.bind(null, 'private')}>
                            <Image className={getImageStyle(preschool.private)}
                                   src='/png/preschool-icon-private.png' width={20} height={32}
                                   alt='prywatne przedszkole'/>
                        </li>
                    </ul>
                    <ul className={styles.filters__list}>
                        <span className={styles.filters__list_title}>
                            Przedszkole Publiczne
                        </span>
                        <li className={styles.filters__list_item} onClick={handleClickPreschool.bind(null, 'public')}>
                            <Image className={getImageStyle(preschool.public)}
                                   src='/png/preschool-icon-public.png' width={20} height={32}
                                   alt='przedszkole publiczne'/>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Filters;