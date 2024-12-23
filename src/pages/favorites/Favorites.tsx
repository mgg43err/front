import React from 'react';
import styles from './Favorites.module.scss';
import { CardAuto } from '../../components/cardAuto/CardAuto';
import { getValueFromLocalStorage } from '../../helpers/localStorage/getValueFromLocalStorage';
import type { AutoCard } from '../../interfaces/cars.interface';
import { BreadCrumpPage } from '../../components/breadCrumpPage/BreadCrumpPage';

export const Favorites = (): React.JSX.Element => {
    const carList = getValueFromLocalStorage<AutoCard[]>('favorites', []);

    return (
        <div className="container">
            <div className="page">
                <BreadCrumpPage
                    links={[
                        { name: 'Главная', url: '/' },
                        { name: 'Избранное', url: '/favorites' },
                    ]}
                />
                <h1 className={'page__title'}>Избранное</h1>
                <div className={styles.favorites__list}>
                    {carList.length
                        ? carList.map((car) => {
                              return <CardAuto {...car} />;
                          })
                        : 'Нет избранных авто'}
                </div>
            </div>
        </div>
    );
};
