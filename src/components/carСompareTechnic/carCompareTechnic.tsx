import React, { useEffect, useState } from 'react';
import { CarCompareCatalog } from '../../interfaces/catologCars.interface';
import styles from './carCompareTechnic.module.scss';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../helpers/formatPrice';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Loader } from '../loader/Loader';
import { Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import { useDispatch } from 'react-redux';
import { openModal, setOrderType } from '../../redux/slice/modalSlice';

const CarCompareTechnic = (): React.JSX.Element => {
    const { brand, model } = useParams();
    const dispatch = useDispatch();

    const [carCompare, setCarСompare] = useState<CarCompareCatalog | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL!}/car_catalogs/${model?.split('_')[1]}/compare`,
                );
                const result = await response.json();
                setCarСompare(result);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={styles.car_compare_technic_container}>
            <div className={styles.car_model_complectation_title_wrapper}>
                <h2
                    className={styles.car_model_complectation_title}
                >{`Сравнение комплектаций ${brand} ${model?.split('_')[0]}`}</h2>
            </div>
            <div className={styles.car_model_complectation_table}>
                {isLoading ? (
                    <Loader />
                ) : carCompare?.groups.length !== 0 ? (
                    <>
                        <div className={styles.car_model_complectation_table_titles}>
                            {carCompare?.groups.map((car, index) => {
                                const { group_name, features } = car;
                                return (
                                    <React.Fragment key={`${group_name}_${index}`}>
                                        <div
                                            className={`${styles.car_model_complectation_table_title} ${styles.big}`}
                                            title={group_name}
                                        >
                                            {group_name}
                                        </div>
                                        {features.map((feature, i) => {
                                            const { feature_name } = feature;
                                            return (
                                                <div
                                                    key={`${feature_name}_${i}`}
                                                    className={styles.car_model_complectation_table_title}
                                                    title={feature_name}
                                                >
                                                    {feature_name}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <Swiper
                            wrapperClass={styles.swiper_wraper}
                            breakpoints={{
                                650: {
                                    slidesPerView: 1,
                                },
                                750: {
                                    slidesPerView: 2,
                                },
                                930: {
                                    slidesPerView: 3,
                                },
                                1160: {
                                    slidesPerView: 4,
                                },
                            }}
                            spaceBetween={0}
                            pagination={{
                                type: 'progressbar',
                            }}
                            grabCursor
                            modules={[Pagination]}
                            className={styles.car_model_complectation_table_content}
                        >
                            {carCompare?.configurations.map((config, index) => {
                                const { package_name, volume, power, special_price } = config;

                                return (
                                    <SwiperSlide
                                        key={`${package_name}_${special_price}_${index}`}
                                        className={styles.car_model_complectation_table_content_wrapper}
                                    >
                                        <React.Fragment key={`${package_name}_${index}`}>
                                            <div className={styles.car_model_complectation_table_description}>
                                                <div>{package_name}</div>
                                                <div>{`${volume} / ${power} л.с. /`}</div>
                                                <div>от {formatPrice(special_price)} &#8381;</div>
                                                <ButtonCardOpenModal
                                                    textContent="Забронировать"
                                                    handler={() => {
                                                        dispatch(openModal('callback'));
                                                        dispatch(setOrderType('book'));
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.car_model_complectation_table_items}>
                                                {carCompare.groups.map((group) => {
                                                    const { group_name, features } = group;

                                                    return (
                                                        <React.Fragment key={`${group_name}_${index}`}>
                                                            <div
                                                                className={styles.car_model_complectation_table_title}
                                                            ></div>
                                                            {features.map((feature) => {
                                                                const { values, feature_name } = feature;
                                                                return (
                                                                    <div
                                                                        key={`${feature_name}_${index}`}
                                                                        className={
                                                                            styles.car_model_complectation_table_title
                                                                        }
                                                                    >
                                                                        {values[index]}
                                                                    </div>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        </React.Fragment>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </>
                ) : (
                    <div className={styles.car_model_complectation_notification}>
                        Информация о комплектациях отсутствует.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarCompareTechnic;
