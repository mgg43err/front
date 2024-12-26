import { CarCatologConfigurations } from '../../interfaces/catologCars.interface';

export const getCreditDiscountsData = (carConfigurations: CarCatologConfigurations[]) => {
    const result: { title: string; discount: number }[] = [];
    const { configurations } = carConfigurations[0];
    const { credit_discount, trade_in_discount, recycling_discount } = configurations[0];
    result.push(
        {
            title: 'Скидка при оформлении кредита',
            discount: credit_discount,
        },
        {
            title: 'Скидка за Trade-in вашего авто',
            discount: trade_in_discount,
        },
        {
            title: 'Утилизация вашего авто',
            discount: recycling_discount,
        },
    );

    return result;
};
