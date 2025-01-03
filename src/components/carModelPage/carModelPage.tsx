import React, { useEffect } from 'react';
import { BreadCrumpPage } from '../breadCrumpPage/BreadCrumpPage';
import styles from './carModelPage.module.scss';
import { useParams } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import CarModelGeneralInfo from '../carModelGeneralInfo/carModelGeneralInfo';
import CarModelComplectation from '../carModelComplectation/carModelComplectation';
import CarTechnicalChars from '../carTechnicalChars/carTechnicalChars';
import CarCompareTechnic from '../carСompareTechnic/carCompareTechnic';
import CarPhotoGallery from '../carPhotoGallery/carPhotoGallery';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { catalogCarLoader } from '../../redux/slice/catalogCarSlice';
import { catalogCarSelector } from '../../redux/selectors';

const CarModelPage = (): React.JSX.Element => {
    const { brand, model } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    const {
        catalogCar,
        stateLoad: { isLoading },
    } = useSelector(catalogCarSelector);

    useEffect(() => {
        dispatch(catalogCarLoader(model));
    });

    return (
        <div className={styles.container}>
            <div className={styles.page}>
                <BreadCrumpPage
                    links={[
                        { name: 'Главная', url: '/' },
                        { name: 'Каталог', url: '/catalog' },
                        { name: `${brand}`, url: `/catalog/${brand}` },
                        { name: `${model?.split('_')[0]}`, url: `/catalog/${brand}/${model}` },
                    ]}
                />
                {isLoading ? (
                    <Loader />
                ) : catalogCar ? (
                    <div className={styles.car_model_container}>
                        <CarModelGeneralInfo {...catalogCar} />
                        <CarModelComplectation {...catalogCar} />
                        <CarCompareTechnic />
                        <CarTechnicalChars {...catalogCar} />
                        <CarPhotoGallery {...catalogCar} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CarModelPage;
