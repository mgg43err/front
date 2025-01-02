import React from 'react';
import styles from './CheckHistory.module.scss';
import { checkForDamage } from '../../helpers/car/checkCarDamage';
import { openModal } from '../../redux/slice/modalSlice';
import { useDispatch } from 'react-redux';
import { vinTransform } from '../../helpers/vinTransform';
import type { AutoCard } from '../../interfaces/cars.interface';
import { getCountOwner } from '../../helpers/getCountOwner';

export const CheckHistory = (props: AutoCard): React.JSX.Element => {
    const dispatch = useDispatch();
    const history = props.history_cars[0];
    const { vin, accidents_found, pledge_status, previous_owners, repair_estimates_found } = history;

    const openModalReport = (): void => {
        dispatch(openModal('report'));
    };

    return (
        <>
            {Number(vin) !== 0 && (
                <div className={styles.check_history}>
                    <h3 className={styles.check_history__title}>Проверка истории</h3>
                    <ul className={styles.check_history__list}>
                        <li className={styles.check_history__item}>{vin ? vinTransform(vin) : 'Нет данных о VIN'}</li>
                        <li className={styles.check_history__item}>{getCountOwner(previous_owners)} по ПТС</li>
                        <li className={styles.check_history__item}>{accidents_found}</li>
                        <li className={styles.check_history__item}>{checkForDamage(repair_estimates_found)}</li>
                        <li className={styles.check_history__item}>{pledge_status}</li>
                    </ul>
                    <button className={styles.check_history__report_look} type="button" onClick={openModalReport}>
                        Смотреть отчёт
                    </button>
                </div>
            )}
        </>
    );
};
