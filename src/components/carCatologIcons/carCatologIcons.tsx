import { Link } from 'react-router-dom';
import styles from './carCatologIcons.module.scss';
import React from 'react';
import { getCarCatalogImg } from '../../helpers/catalog/getCarCatalogImg';
import { CarBrand } from '../../interfaces/catologCars.interface';

const CarCatologIcons = (props: CarBrand): React.JSX.Element => {
    const { brand, models_count } = props;
    return (
        <Link to={`/catalog/${brand}`} className={styles.top_brands_item}>
            <div className={styles.top_brands_img}>
                <img src={getCarCatalogImg(brand)} alt={brand} title={brand} />
            </div>
            <div className={styles.top_brands_title}>{brand}</div>
            <div className={styles.top_brands_countcars}>{`${models_count} авто`}</div>
        </Link>
    );
};

export default CarCatologIcons;
