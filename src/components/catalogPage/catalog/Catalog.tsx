import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { BreadCrumpPage } from '../../breadCrumpPage/BreadCrumpPage';
import { getCarCatalogImg } from '../../../helpers/catalog/getCarCatalogImg';
import { Loader } from '../../loader/Loader';
import { Link, Outlet } from 'react-router-dom';

type CarBrand = {
    brand: string;
    models_count: number;
};

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
                    <div className={styles.top__brands_container}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            carsCatalog?.map((car) => {
                                return (
                                    <Link
                                        to={`/catalog/${car.brand}`}
                                        key={car.brand}
                                        className={styles.top_brands_item}
                                    >
                                        <div className={styles.top_brands_img}>
                                            <img src={getCarCatalogImg(car.brand)} alt={car.brand} title={car.brand} />
                                        </div>
                                        <div className={styles.top_brands_title}>{car.brand}</div>
                                        <div className={styles.top_brands_countcars}>{`${car.models_count} авто`}</div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Catalog;
