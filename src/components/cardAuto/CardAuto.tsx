import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './CardAuto.module.scss';
import { ButtonFavorite } from '../buttonFavorite/ButtonFavorite';
import { formatPrice } from '../../helpers/formatPrice';
import { InStockSign } from '../inStockSign/InStockSign';
import { getPayment } from '../../helpers/car/getPayment';
import { ButtonCardOpenModal } from '../buttonCardOpenModal/ButtonCard';
import { useCardAuto } from '../../hook/useCardAuto';
import { getCountOwner } from '../../helpers/getCountOwner';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { AutoCard, ExtraCardAuto } from '../../interfaces/cars.interface';

export const CardAuto = React.memo((props: AutoCard & ExtraCardAuto): React.JSX.Element => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { year, model, brand, price, images, extraClassName, inModalCredit, online_view_available } = props;

    const getOptimizedImageUrl = useCallback((url: string) => `${url}?w=360&q=75&format=webp`, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const {
        currentImageIndex,
        isSelected,
        handlers: { handleCardClick, handleCreditButtonClick, handleImageClick, handleMouseMove },
    } = useCardAuto({ car: props });

    const imageElements = useMemo(
        () =>
            images.slice(0, 4).map((image, index) => (
                <SwiperSlide key={index} className={styles.card_auto__slider_item}>
                    <img
                        className={`${styles.card_auto__slider_item} ${currentImageIndex === index ? styles.card_auto__slider_item_active : ''}`}
                        src={image.url}
                        alt={`${brand.name} ${year}`}
                        loading="lazy"
                    />
                </SwiperSlide>
            )),
        [images, currentImageIndex, brand.name, year],
    );

    return (
        <article className={`${styles.card_auto} ${extraClassName || ''}`} onClick={handleCardClick}>
            <section className={styles.card_auto__body}>
                <header className={styles.card_auto__header}>
                    <InStockSign state={online_view_available} />
                    {!inModalCredit && <ButtonFavorite car={props} />}
                </header>

                <div className={styles.card_auto__picture_container} onClick={handleImageClick}>
                    {isMobile ? (
                        <Swiper className={styles.slider_card} slidesPerView={1} spaceBetween={24}>
                            {imageElements}
                        </Swiper>
                    ) : (
                        <div className={styles.card_auto__picture_container}>
                            <img
                                className={styles.card_auto__picture}
                                src={
                                    images[currentImageIndex]?.url
                                        ? getOptimizedImageUrl(images[currentImageIndex].url)
                                        : ''
                                }
                                alt={`${brand.name} ${year}`}
                                loading="lazy"
                            />
                            <div className={styles.card_auto__slider}>
                                {Array.from({ length: Math.min(images.length, 4) }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.card_auto__slider_item} ${currentImageIndex === index ? styles.card_auto__slider_item_active : ''}`}
                                        onMouseMove={() => handleMouseMove(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <h3 className={styles.card_auto__name}>
                    {brand.name} {model.name} <span>{year}</span>
                </h3>
                <p className={styles.card_auto__tags}>
                    <span>{props.engine_capacity_type.capacity}л.</span>&nbsp;
                    <span>{props.history_cars[0]?.last_mileage}км.</span>&nbsp;
                    <span>{props.engine_power_type.power}л.с.</span>&nbsp;
                    <span>{props.gearbox_type.abbreviation}</span>&nbsp;
                    <span>{props.engine_name_type.name}</span>&nbsp;
                    <span>{getCountOwner(props.history_cars[0]?.previous_owners)}</span>&nbsp;
                    <span>{props.drive_type.name}</span>&nbsp;
                    <span>{props.body_type.name}</span>&nbsp;
                </p>
            </section>
            <section className={styles.card_auto__footer}>
                <div className={styles.card_auto__price_box}>
                    <span className={styles.card_auto__price}>{formatPrice(price)} &#8381;</span>
                    <span className={styles.card_auto__price_no_fee}>
                        {formatPrice(getPayment(price, 0, 96, 0))}&#8381;/мес. без взноса
                    </span>
                </div>

                {!inModalCredit && (
                    <ButtonCardOpenModal textContent="Купить в кредит" handler={handleCreditButtonClick} />
                )}

                {props.inModalSelect && (
                    <button className={styles.card_auto__buy} type="button" onClick={handleCardClick}>
                        {isSelected ? 'Выбрана' : 'Выбрать'}
                    </button>
                )}
            </section>
        </article>
    );
});
