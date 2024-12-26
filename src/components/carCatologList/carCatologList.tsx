import { Link } from 'react-router-dom';
import { CarBrand } from '../../interfaces/catologCars.interface';
import styles from './carCatologList.module.scss';
import React from 'react';

const CarCatologList = (props: CarBrand): React.JSX.Element => {
    const { brand, models } = props;
    return (
        <div className={styles.car_list_container}>
            <div className={styles.car_list_title}>{brand}</div>
            <div className={styles.car_list_catolog}>
                {models.map((car) => {
                    const { id, model } = car;

                    return (
                        <Link
                            key={`${model}_${id}`}
                            className={styles.car_list_model}
                            to={`/catalog/${brand}/${model}_${id}`}
                        >
                            {model}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CarCatologList;
