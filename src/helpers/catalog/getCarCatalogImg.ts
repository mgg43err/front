export const getCarCatalogImg = (brand: string): string => {
    return require(`../../assets/images/catalog/${brand.toLowerCase()}.webp`);
};
