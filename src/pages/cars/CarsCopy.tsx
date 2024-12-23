import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CarsFilterCopy } from '../../components/carsFilter/CarsFilterCopy';
import { BreadCrumpPage } from '../../components/breadCrumpPage/BreadCrumpPage';
import { loadCars } from '../../redux/slice/carsSlice';
import type { AppDispatch } from '../../redux/store';

export const CarsCopy = (): React.JSX.Element => {
    // const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const defaultParams = {
            year_from: '2020',
            price_asc: 'true',
            ...currentParams, // Keep any existing params
        };

        // Update search params with defaults
        setSearchParams(defaultParams, { replace: false });

        // Dispatch loadCars with all parameters
        dispatch(loadCars(defaultParams));
    }, []); // Only run once on mount

    return (
        <div className="container">
            <div className={`page`}>
                <BreadCrumpPage
                    links={[
                        { name: 'Главная', url: '/' },
                        { name: 'Спецпредолжение', url: '/cars_copy' },
                    ]}
                />
                <CarsFilterCopy />
            </div>
        </div>
    );
};
