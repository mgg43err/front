import React from 'react';
import styles from './requestBanner.module.scss';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';

type RequestBannerProps = {
    brand: string | undefined;
};

const RequestBanner = (props: RequestBannerProps): React.JSX.Element => {
    const { brand } = props;
    return (
        <div className={styles.request_banner_container}>
            <h2 className={styles.request_banner_title}>
                {`Оставьте заявку на покупку автомобиля ${brand} и получите специальную скидку`}
            </h2>
            <div className={styles.request_banner_btn_wrapper}>
                <ButtonCardOpenModal
                    textContent="Оставить заявку"
                    handler={() => {
                        console.log('call');
                    }}
                />
            </div>
        </div>
    );
};

export default RequestBanner;
