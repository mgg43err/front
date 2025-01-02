import React, { useEffect, useState } from 'react';
import styles from './ListCatalog.module.scss';

const ListCatalogs = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await fetch('https://usecarmax.ru/car_catalogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Parse the response as JSON
                setCatalogs(data);
            } catch (e) {
                setError('Error fetching catalogs');
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogs();
    }, []);

    const paginate = (array: any[], page_size: number, page_number: number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Paginate the catalogs
    const paginatedCatalogs = paginate(catalogs, itemsPerPage, currentPage);

    return (
        <div>
            <h1>Каталог машин</h1>
            <div className={styles.container}>
                <div className={styles.catalog_head}>
                    <div>Брэнд</div>
                    <div>Модель</div>
                    <div>Мощность</div>
                    <div>Аккумулятор</div>
                    <div>Максимальная скорость</div>
                    <div>Редактировать</div>
                    <div>Удалить</div>
                </div>
                {paginatedCatalogs.map((catalog: any) => (
                    <div key={catalog.id}>
                        <div>{catalog?.brand}</div>
                        <div>{catalog?.model}</div>
                        <div>{catalog?.power}</div>
                        <div>{catalog?.acceleration}</div>
                        <div>{catalog?.max_speed}</div>
                        <div>
                            <button>Поменять</button>
                        </div>
                        <div>
                            <button>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {/* Pagination Controls */}
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Предыдущаяы
                </button>
                <span> Страница {currentPage} </span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= catalogs.length}
                >
                    Следующая
                </button>
            </div>
        </div>
    );
};

export default ListCatalogs;
