import React, { useState } from 'react';
import { CarCatologModel } from '../../interfaces/catologCars.interface';
import styles from './carModelComplectation.module.scss';
import CarDiscountCalculator from '../carDiscountCalculator/carDiscountCalculator';

const CarModelComplectation = (props: CarCatologModel): React.JSX.Element => {
    const { model, brand, car_catalog_configurations, car_colors } = props;
    const { image } = car_colors[0];

    const [activeRowId, setActiveRowId] = useState<number | null>(null);
    const [discount, setDiscount] = useState<number[]>([]);
    console.log(discount);
    const toggleRow = (id: number) => {
        setActiveRowId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className={styles.car_model_complectation_wrapper}>
            <h2 className={styles.car_model_complectation_title}>{`Комплектации и цены ${brand} ${model}`}</h2>
            <table>
                <tbody>
                    <tr className={styles.car_model_prices_titles}>
                        <th>Комплектация</th>
                        <th>Объем</th>
                        <th>КПП</th>
                        <th>Мощность</th>
                        <th>Цена</th>
                        <th>Скидка</th>
                        <th>Специальная цена</th>
                    </tr>
                    {car_catalog_configurations.map((group, index) => {
                        const { configurations, package_group } = group;

                        return (
                            <React.Fragment key={`car_catalog_group_${index}`}>
                                <tr key={`${package_group}_${index}`} className={styles.car_model_group_name}>
                                    <td className={styles.car_model_complectation_title_row} colSpan={7}>
                                        {package_group}
                                    </td>
                                </tr>
                                {configurations.map((config) => {
                                    const { id, package_name, volume, transmission, power, price, car_catalog_extras } =
                                        config;

                                    return (
                                        <React.Fragment key={`configurations_${id}`}>
                                            <tr
                                                onClick={() => toggleRow(id)}
                                                key={`${package_name}_${id}`}
                                                className={`${styles.car_model_complectation_title_main} ${styles.car_model_group_name}`}
                                            >
                                                <td>{package_name}</td>
                                                <td>{volume}</td>
                                                <td>{transmission}</td>
                                                <td>{power}</td>
                                                <td>{price}</td>
                                                <td>{discount.reduce((a, b) => a + b, 0)}&#8381;</td>
                                                <td>0&#8381;</td>
                                            </tr>
                                            {activeRowId && (
                                                <tr
                                                    key={`extras_${package_name}_${id}`}
                                                    className={`${styles.car_model_complection_content} ${activeRowId === id ? styles.active : ''}`}
                                                >
                                                    <td colSpan={7}>
                                                        <ul className={styles.car_model_complection_extras_list}>
                                                            {car_catalog_extras.map((extra, extraIndex) => {
                                                                const { group_name, extra_names } = extra;
                                                                return (
                                                                    <React.Fragment
                                                                        key={`car_catalog_extras_${group_name.id}`}
                                                                    >
                                                                        <li
                                                                            className={styles.car_catalog_extras_title}
                                                                            key={`${id}_${group_name.id || extraIndex}`}
                                                                        >
                                                                            {group_name.name}
                                                                        </li>
                                                                        {extra_names.map((name, i) => {
                                                                            return (
                                                                                <li key={`extra_names_${name}_${i}`}>
                                                                                    {name}
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </ul>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
            <CarDiscountCalculator
                model={model}
                brand={brand}
                image={image}
                car_catalog_configurations={car_catalog_configurations}
                setDiscount={setDiscount}
            />
        </div>
    );
};

export default CarModelComplectation;
