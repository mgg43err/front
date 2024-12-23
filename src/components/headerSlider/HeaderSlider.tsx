import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HeaderSliderElement } from '../headerSliderElement/HeaderSliderElement';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export const HeaderSlider: React.FC = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [activeBanner, setActiveBanner] = useState<any>(null);
    // const defaultImage = 'https://raw.githubusercontent.com/pl1tz/project/refs/heads/master/public/main.webp'; // Укажите путь к изображению по умолчанию
    // const defaultText = 'Текст по умолчанию'; // Укажите текст по умолчанию

    // Function to fetch banners
    const fetchBanners = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/banners`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            console.error('Ошибка при загрузке баннеров:', error);
        }
    };

    // Use useEffect to fetch banners when the component mounts
    useEffect(() => {
        fetchBanners();
    }, []);

    // Set the active banner based on the fetched banners
    useEffect(() => {
        console.log(banners, typeof banners);
        const activeBanners = banners;
        if (Object.keys(activeBanners).length > 0) {
            setActiveBanner(activeBanners); // Set the first active banner
        } else {
        }
    }, [banners]);

    return (
        <section>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    type: 'progressbar',
                }}
                rewind={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop={true}
            >
                {activeBanner ? (
                    activeBanner.map((banner: any) => (
                        <>
                            <SwiperSlide>
                                <HeaderSliderElement
                                    title={banner.main_text}
                                    descriptionStroke={[banner.second_text]}
                                    linkPath="/"
                                    imgPath={banner.image}
                                />
                            </SwiperSlide>
                        </>
                    ))
                ) : (
                    <SwiperSlide>
                        <div>Загрузка баннеров...</div> {/* Optional loading state */}
                    </SwiperSlide>
                )}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </Swiper>
        </section>
    );
};
