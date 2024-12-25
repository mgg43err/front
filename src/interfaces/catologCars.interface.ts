export interface CarModels {
    id: number;
    model: number;
}

export interface CarBrand {
    brand: string;
    models_count: number;
    models: CarModels[];
}

export interface CarsByBrand {
    id: number;
    brand: string;
    model: string;
    power: number;
    acceleration: number;
    consumption: number | null;
    car_color: {
        id: number;
        image: string;
    };
}

export interface CarColors {
    id: number;
    background: string;
    name: string;
    image: string;
}

export interface CarCatologTechnos {
    id: number;
    image: string;
    width: number;
    height: number;
    length: number;
}

export interface CarCatologEngines {
    id: number;
    name_engines: string;
    torque: number;
    power: number;
    cylinders: number;
    engine_volume: number;
    fuel_type: string;
    engine_type: string;
}

export interface CarCatologImages {
    id: number;
    url: string;
}

export interface Configurations {
    id: number;
    package_name: string;
    volume: number;
    transmission: string;
    power: number;
    price: number;
    credit_discount: number;
    trade_in_discount: number;
    recycling_discount: number;
    special_price: number;
}

export interface CarCatologConfigurations {
    package_group: string;
    configurations: Configurations[];
}

export interface CarCatologModel {
    id: number;
    brand: string;
    model: string;
    power: number;
    acceleration: number;
    consumption: number | null;
    max_speed: number;
    car_colors: CarColors[];
    car_catalog_contents: [];
    car_catalog_texnos: CarCatologTechnos[];
    car_catalog_engines: CarCatologEngines[];
    car_catalog_images: CarCatologImages[];
    car_catalog_configurations: CarCatologConfigurations[];
}
