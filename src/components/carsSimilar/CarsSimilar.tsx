import React from 'react';
import { CardAuto } from '../cardAuto/CardAuto';
import { Loader } from '../loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCarsSimilar } from '../../hook/useCarsSimilar';
import { Link } from 'react-router-dom';
import type { AutoCard } from '../../interfaces/cars.interface';

export const CarsSimilar = ({ car }: { car: AutoCard }): React.JSX.Element => {
    const { isLoading, isError, carsSimilar, slidesPerView } = useCarsSimilar(car);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <>Ошибка загрузки похожих автомобилей</>;
    }

    const uniqueCarsSimilar = Array.from(new Set(carsSimilar.map((c) => c.id)))
        .map((id) => carsSimilar.find((c) => c.id === id))
        .filter((c): c is AutoCard => c !== undefined);

    return (
        <Swiper className="swiper-latest-arrivals" slidesPerView={slidesPerView} spaceBetween={24}>
            {uniqueCarsSimilar.map((carSimilar) => (
                <SwiperSlide key={carSimilar.id}>
                    <Link to={`/car/${carSimilar.brand.name}/${carSimilar.id}`} reloadDocument>
                        <CardAuto {...carSimilar} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
