import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumpPage } from '../../components/breadCrumpPage/BreadCrumpPage';

const InStockList = React.lazy(() =>
    import('../../components/inStockList/InStockList').then((module) => ({ default: module.InStockList })),
);
const CarSelection = React.lazy(() =>
    import('../../components/carSelection/CarSelection').then((module) => ({ default: module.CarSelection })),
);
const CarsFilter = React.lazy(() =>
    import('../../components/carsFilter/CarsFilter').then((module) => ({ default: module.CarsFilter })),
);

export const Cars = (): React.JSX.Element => {
    const { brand, model, generation } = useParams();

    return (
        <div className="container">
            <div className={`page`}>
                <BreadCrumpPage
                    links={[
                        { name: 'Главная', url: '/' },
                        { name: 'Авто с пробегом', url: '/cars' },
                    ]}
                />
                <h1 className={`page__title`}>
                    {!brand ? 'Купить автомобиль в Москве' : `${brand} ${model || ''} ${generation || ''}`}
                </h1>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <InStockList />
                    <CarSelection />
                    <CarsFilter />
                </Suspense>
            </div>
        </div>
    );
};
