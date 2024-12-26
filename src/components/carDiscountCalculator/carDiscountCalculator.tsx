import React, { Dispatch, SetStateAction } from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import styles from './carDiscountCalculator.module.scss';
import CheckCreditDiscount from '../checkCreditDiscount/checkCreditDiscount';
import { CarCatologConfigurations } from '../../interfaces/catologCars.interface';
import { getCreditDiscountsData } from '../../helpers/catalog/getCreditDiscountsData';

type CarDiscountCalculatorProps = {
    model: string;
    brand: string;
    image: string;
    car_catalog_configurations: CarCatologConfigurations[];
    discount: number;
    setDiscount: Dispatch<SetStateAction<number>>;
};

const CarDiscountCalculator = (prop: CarDiscountCalculatorProps): React.JSX.Element => {
    const { model, brand, image, car_catalog_configurations, setDiscount, discount } = prop;

    const discounts = getCreditDiscountsData(car_catalog_configurations);

    return (
        <div className={styles.car_discount_container}>
            <div className={styles.car_discount_title}>{`Выбери свою выгоду на покупку ${brand} ${model}`}</div>
            <div className={styles.car_discount_main}>
                <div className={styles.car_discount_input_list}>
                    {discounts.map((elem, index) => {
                        return (
                            <CheckCreditDiscount
                                key={`${elem.title}_${index}`}
                                discountValue={elem.discount}
                                description={elem.title}
                                setDiscount={setDiscount}
                            />
                        );
                    })}
                </div>
                <div className={styles.car_discount_overall_info}>
                    <div className={styles.car_discount_generall_price}>
                        <p>Oбщая скидка</p>
                        <span>от {formatPrice(discount)}&#8381;</span>
                    </div>
                    <img src={image} title={`${brand} ${model}`} alt={`${brand} ${model}`} />
                </div>
            </div>
        </div>
    );
};

export default CarDiscountCalculator;
