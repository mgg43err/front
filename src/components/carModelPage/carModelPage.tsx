import React, { useEffect, useState } from 'react';
import { BreadCrumpPage } from '../breadCrumpPage/BreadCrumpPage';
import styles from './carModelPage.module.scss';
import { useParams } from 'react-router-dom';
import { CarCatologModel } from '../../interfaces/catologCars.interface';
import { Loader } from '../loader/Loader';
import CarModelGeneralInfo from '../carModelGeneralInfo/carModelGeneralInfo';
import CarModelComplectation from '../carComplectationPrice/carModelComplectation';
import CarTechnicalChars from '../carTechnicalChars/carTechnicalChars';

const CarModelPage = (): React.JSX.Element => {
    const { brand, model } = useParams();

    const [carModel, setCarModel] = useState<CarCatologModel | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/car_catalogs/${model?.split('_')[1]}`);
                const result = await response.json();
                setCarModel(result[0]);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

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
                ) : carModel ? (
                    <div className={styles.car_model_container}>
                        <CarModelGeneralInfo {...carModel} />
                        <CarModelComplectation {...carModel} />
                        <CarTechnicalChars {...carModel} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CarModelPage;
