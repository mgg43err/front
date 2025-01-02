import React, { Dispatch, SetStateAction } from 'react';
import styles from './carColorSwiper.module.scss';
import { CarColors } from '../../interfaces/catologCars.interface';

const CarColorSwitcher = ({
    carColors,
    onClick,
    colorIndex,
}: {
    carColors: CarColors[];
    colorIndex: number;
    onClick: Dispatch<SetStateAction<number>>;
}): React.JSX.Element => {
    const handleChangeCarColor = (value: number) => {
        onClick(value);
    };

    return (
        <div className={styles.color_switcher_section}>
            <div className={styles.color_switcher_samples_container}>
                <div className={styles.color_samples_container}>
                    {carColors.map((color, index) => {
                        return (
                            <button
                                key={color.id}
                                onClick={() => {
                                    handleChangeCarColor(index);
                                }}
                                className={`${styles.color_sample} ${colorIndex === index ? styles.active : ''}`}
                                style={{ background: color.background }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CarColorSwitcher;
