import React from 'react';
import { CarCatologModel } from '../../interfaces/catologCars.interface';
import styles from './carPhotoGallery.module.scss';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const CarPhotoGallery = (props: CarCatologModel): React.JSX.Element => {
    const { brand, model, car_catalog_images } = props;

    React.useEffect(() => {
        Fancybox.bind('[data-fancybox]');

        return () => {
            Fancybox.destroy();
        };
    }, []);

    return (
        <div className={styles.car_photo_gallery_container}>
            <div className={styles.car_photo_gallery_title_wrapper}>
                <h2 className={styles.car_photo_gallery_title}>{`Фотогалерея ${brand} ${model}`}</h2>
            </div>
            <div data-fancybox="gallery" className={styles.car_photo_gallery_main}>
                {car_catalog_images.map((image) => {
                    const { url, id } = image;
                    return (
                        <div
                            data-fancybox="gallery"
                            data-src={url}
                            key={id}
                            className={`${styles.car_photo_gallery_image}`}
                        >
                            <img src={url} title={`${brand} ${model}`} alt={`${brand} ${model}`}></img>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarPhotoGallery;
