import React, { useEffect, useState } from 'react';
import { BreadCrumpPage } from '../../breadCrumpPage/BreadCrumpPage';
import styles from './Brand.module.scss';
import { useParams } from 'react-router-dom';
import { Loader } from '../../loader/Loader';

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
                <div className={styles.model_card_list}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        carsByBrand?.map((car) => {
                            return (
                                <div
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
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandModels;
