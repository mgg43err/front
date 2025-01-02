import React, { useEffect, useState } from 'react';
import { BreadCrumpPage } from '../breadCrumpPage/BreadCrumpPage';
import styles from './Brand.module.scss';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import RequestBanner from '../requestBanner/requestBanner';

type CarsByBrand = {
    id: number;
    brand: string;
    model: string;
    power: number;
    acceleration: number;
    consumption: number | null;
    car_color: {
        id: number;
        image: string;
    };
};

const BrandModels = (): React.JSX.Element => {
    const { brand } = useParams();
    const [carsByBrand, setCarsByBrand] = useState<CarsByBrand[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL!}/car_catalogs/cars_by_brand?brand_name=${brand}`,
                );
                const result = await response.json();
                setCarsByBrand(result);
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
                    ]}
                />
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className={styles.modal_card_wrapper}>
                        <h2 className={styles.model_card_title}>{brand}</h2>
                        <RequestBanner brand={brand} />
                        <div className={styles.model_card_list}>
                            {carsByBrand?.map((car) => {
                                return (
                                    <Link
                                        to={`/catalog/${car.brand}/${car.model}_${car.id}`}
                                        key={`${car.id}_${car.brand}_${car.model}`}
                                        className={styles.model_card_container}
                                    >
                                        <div className={styles.model_card_img}>
                                            <img
                                                src={car.car_color.image}
                                                title={`${car.brand} ${car.model}`}
                                                alt={`${car.brand} ${car.model}`}
                                            ></img>
                                        </div>
                                        <div className={styles.model_card_chars}>
                                            <span>{`${!car.power ? '-' : car.power} л.с.`}</span>
                                            <span>{`${!car.acceleration ? '-' : car.acceleration} c.`}</span>
                                            <span>{`${!car.consumption ? '-' : car.consumption} л/км`}</span>
                                        </div>
                                        <h3 className={styles.model_card_title}>{`${car.brand} ${car.model}`}</h3>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandModels;
