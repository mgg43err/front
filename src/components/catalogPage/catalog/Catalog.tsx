import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { BreadCrumpPage } from '../../breadCrumpPage/BreadCrumpPage';
import { Loader } from '../../loader/Loader';
import { CarBrand } from '../../../interfaces/catologCars.interface';
import CarCatologIcons from '../../carCatologIcons/carCatologIcons';
import CarCatologList from '../../carCatologList/carCatologList';

const Catalog = (): React.JSX.Element => {
    const [carsCatalog, setCarsCatalog] = useState<CarBrand[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL!}/car_catalogs/all_catalog`);
                const result = await response.json();
                setCarsCatalog(result);
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
                    ]}
                />
                <div className={styles.catalog}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className={styles.top__brands_container}>
                                {carsCatalog?.map((car) => {
                                    return <CarCatologIcons key={car.brand} {...car} />;
                                })}
                            </div>
                            <h2 className={styles.top__brands_title}>Cписок моделей автомобилей</h2>
                            <div className={styles.car_list_wrapper}>
                                {carsCatalog?.map((car, index) => {
                                    return <CarCatologList key={`${car.brand}_${index}`} {...car} />;
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
