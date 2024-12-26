import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { formatPrice } from '../../helpers/formatPrice';
import styles from './checkCreditDiscount.module.scss';

type CheckCreditDiscountProps = {
    discountValue: number;
    description: string;
    setDiscount: Dispatch<SetStateAction<number[]>>;
};

const CheckCreditDiscount = (props: CheckCreditDiscountProps) => {
    const { discountValue, description, setDiscount } = props;

    const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.currentTarget;
        const numericValue = Number(value);

        setDiscount((prevValues) => {
            if (checked) {
                return [...prevValues, numericValue];
            } else {
                return prevValues.filter((val) => val !== numericValue);
            }
        });
    };

    return (
        <label className={styles.car_discount_label}>
            <input onChange={handleCheckChange} value={discountValue} type="checkbox" name="credit-calc"></input>
            <span className={styles.car_discount_item}>
                <span className={styles.car_discount_check_wrapper}>
                    <span className={styles.car_discount_check}></span>
                </span>
                <span className={styles.car_discount_description}>
                    <span>{formatPrice(discountValue)}&#8381;</span>
                    <span>{description}</span>
                </span>
            </span>
        </label>
    );
};

export default CheckCreditDiscount;
