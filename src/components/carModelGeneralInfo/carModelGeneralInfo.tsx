import React, { useState } from 'react';
import { CarCatologModel } from '../../interfaces/catologCars.interface';
import styles from './carModelGeneralInfo.module.scss';
import { CarPrice } from '../carPrice/CarPrice';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';
import CarColorSwitcher from '../carColorSwiper/carColorSwiper';
import FormSpecialOffer from '../formSpecialOffer/formSpecialOffer';
import { openModal, setOrderType } from '../../redux/slice/modalSlice';
import { useDispatch } from 'react-redux';

const CarModelGeneralInfo = (props: CarCatologModel): React.JSX.Element => {
    const dispatch = useDispatch();
    const { model, brand, acceleration, power, consumption, max_speed, car_catalog_configurations, car_colors } = props;
    const { configurations } = car_catalog_configurations[0];

    const [colorIndex, setColorIndex] = useState<number>(0);

    return (
        <div className={styles.car_model_overall}>
            <div className={styles.car_model_overall_wrapper}>
                <h2 className={styles.car_model_title}>{`${brand} ${model}`}</h2>
                <div className={styles.car_model_chars}>
                    <div className={styles.car_model_item}>
                        <p className={styles.car_model_item_description}>Мощность двиг.</p>
                        <span className={styles.car_model_item_value}>{`${!power ? '-' : power} л.с.`}</span>
                    </div>
                    <div className={styles.car_model_item}>
                        <p className={styles.car_model_item_description}>Разгон до 100км/ч</p>
                        <span
                            className={styles.car_model_item_value}
                        >{`${!acceleration ? '-' : acceleration} c.`}</span>
                    </div>
                    <div className={styles.car_model_item}>
                        <p className={styles.car_model_item_description}>Расход бензина на 100км</p>
                        <span className={styles.car_model_item_value}>{`${!consumption ? '-' : consumption} л.`}</span>
                    </div>
                    <div className={styles.car_model_item}>
                        <p className={styles.car_model_item_description}>Макс. скорость</p>
                        <span className={styles.car_model_item_value}>{`${!max_speed ? '-' : max_speed} км/ч`}</span>
                    </div>
                </div>
                <div className={styles.car_model_wrapper}>
                    <div className={styles.car_model_by_credit}>
                        <div className={styles.car_model_price_wrapper}>
                            <CarPrice price={configurations[0].special_price} />
                            <div className={styles.car_moderl_btn_wrapper}>
                                <ButtonCardOpenModal
                                    textContent="Купить в кредит"
                                    handler={() => {
                                        dispatch(openModal('callback'));
                                        dispatch(setOrderType('credit'));
                                    }}
                                />
                            </div>
                        </div>
                        <CarColorSwitcher colorIndex={colorIndex} carColors={car_colors} onClick={setColorIndex} />
                    </div>
                    <div className={styles.color_switcher_img}>
                        <img
                            src={car_colors[colorIndex].image}
                            alt={`${brand} ${model}`}
                            title={`${brand} ${model}`}
                        ></img>
                    </div>
                </div>
            </div>
            <FormSpecialOffer brand={brand} model={model} />
        </div>
    );
};

export default CarModelGeneralInfo;
