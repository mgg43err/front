import React from 'react';
import styles from './carTechnicalChars.module.scss';
import { CarCatologModel } from '../../interfaces/catologCars.interface';

const CarTechnicalChars = (props: CarCatologModel): React.JSX.Element => {
    const { brand, model, car_catalog_texnos, car_catalog_engines } = props;
    const { width, height, length, image } = car_catalog_texnos[0];

    return (
        <>
            <div className={styles.car_technical_chars_container}>
                <div className={styles.car_technical_chars_title_wrapper}>
                    <h2
                        className={styles.car_technical_chars_title}
                    >{`Технические характеристики ${brand} ${model}`}</h2>
                </div>
                {car_catalog_engines.length !== 0 ? (
                    <>
                        <div className={styles.car_technical_techno_wrapper}>
                            <div className={styles.car_technical_img}>
                                <img src={image} title={`${brand} ${model}`} alt={`${brand} ${model}`}></img>
                                <div>{width}</div>
                                <div>{height}</div>
                                <div>{length}</div>
                            </div>
                            <div className={styles.car_technical_engines}>
                                <div className={styles.car_technical_engines_title}>Типы двигателя</div>
                                {car_catalog_engines.map((engine) => {
                                    const { id, engine_volume, engine_type, power } = engine;
                                    return (
                                        <div
                                            key={id}
                                            className={styles.car_technical_item}
                                        >{`${engine_volume} л. / ${power} л.с. / ${engine_type}`}</div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.car_technical_engines_table_wrapper}>
                            <div className={styles.car_technical_engines_table}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { name_engines } = engine;
                                                return <th key={`${name_engines}_${index}`}>{name_engines}</th>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Крутящий момент (Нм)</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { torque } = engine;
                                                return <td key={`${torque}_${index}`}>{torque}</td>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Мощность двигателя</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { power } = engine;
                                                return <td key={`${power}_${index}`}>{power}</td>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Количество цилиндров</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { cylinders } = engine;
                                                return <td key={`${cylinders}_${index}`}>{cylinders}</td>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Объем двигателя</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { engine_volume } = engine;
                                                return <td key={`${engine_volume}_${index}`}>{engine_volume}</td>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Рекомендуемое топливо</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { fuel_type } = engine;
                                                return <td key={`${fuel_type}_${index}`}>{fuel_type}</td>;
                                            })}
                                        </tr>
                                        <tr>
                                            <td>Тип двигателя</td>
                                            {car_catalog_engines.map((engine, index) => {
                                                const { engine_type } = engine;
                                                return <td key={`${engine_type}_${index}`}>{engine_type}</td>;
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.car_technical_notification}>
                        Информация о технических характеристиках отсутствует.
                    </div>
                )}
            </div>
        </>
    );
};

export default CarTechnicalChars;
