import React from 'react';
import styles from './Catalog.module.scss';
// import img from '../../../assets/img/1709564232-s42x42_aito-logo_1707512247.webp';

const Catalog = (): React.JSX.Element => {
    return (
        <div className={styles.catalog}>
            <div className={styles.container}>
                <div className={styles.top__brands_item}>
                    <div className={styles.top__brands_img}>
                        <img src="/img/1709564232-s42x42_aito-logo_1707512247.webp" alt="Aito" title="Aito" />
                    </div>
                    <div className={styles.top__brands_title}>Aito</div>
                    <div className={styles.top__brands_countcars}>2 авто</div>
                    <a href="https://center-auto.ru/katalog/aito"></a>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
