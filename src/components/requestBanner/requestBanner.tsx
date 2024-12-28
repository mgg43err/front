import React from 'react';
import styles from './requestBanner.module.scss';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slice/modalSlice';

type RequestBannerProps = {
    brand: string | undefined;
};

const RequestBanner = (props: RequestBannerProps): React.JSX.Element => {
    const dispatch = useDispatch();
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
                        dispatch(openModal('callback'));
                    }}
                />
            </div>
        </div>
    );
};

export default RequestBanner;
