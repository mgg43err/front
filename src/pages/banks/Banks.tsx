import React from 'react';
import styles from './Banks.module.scss';
import { BanksList } from '../../components/banksList/BanksList';
import { BreadCrumpPage } from '../../components/breadCrumpPage/BreadCrumpPage';

export const Banks = (): React.JSX.Element => {
    return (
        <div className="container">
            <div className={styles.banks}>
                <BreadCrumpPage
                    links={[
                        { name: 'Главная', url: '/' },
                        { name: 'Банки-партнеры', url: '/banks' },
                    ]}
                />
                <h1 className={styles.banks__title}>Банки-партнеры</h1>
                <BanksList />
            </div>
        </div>
    );
};
