import React, { createContext, useContext, useState, useEffect } from 'react';
import themeIcon from '../assets/images/icon_them.png';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme ? savedTheme : 'light';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        const icon = document.getElementById('theme-icon') as HTMLImageElement;
        icon.src = themeIcon;
    };

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        // const a = document.querySelectorAll('a');
        // const ul = document.querySelectorAll('ul');

        if (theme === 'light') {
            root.style.setProperty('--burger-menu-background-color', '#ffffff');
            root.style.setProperty('--background-color', '#ffffff'); // светлый фон
            //root.style.setProperty('--main-color', '#bb26d9'); // основной цвет
            //root.style.setProperty('--main-color', '#0c51d1'); // основной цвет
            root.style.setProperty('--main-color', '#0f8921'); // основной цвет
            root.style.setProperty('--inverse-text-color', '#ffffff'); // цвет текста
            root.style.setProperty('--header-background-color', '#ffffff'); // цвет фона заголовка
            root.style.setProperty('--header-active-background-color', '#ffffff'); // активный заголовок
            root.style.setProperty('--main-text-color', '#212529'); // основной текст
            root.style.setProperty('--light-text-color', '#6c757d'); // светлый текст
            root.style.setProperty('--swiper-slide-background', '#ffffff');
            root.style.setProperty('--btn-color', '#ffffff');
            root.style.setProperty('--vector-color', '#ffffff');
            root.style.setProperty('--container-background-color', '#ffffff');
            body.style.backgroundColor = '#ffffff'; // цвет фона для body
        } else {
            // .BurgerMenu-module__burger_menu #423224
            root.style.setProperty('--burger-menu-background-color', '#212529');
            root.style.setProperty('--background-color', '#212529'); // цвет фона для темной темы
            //root.style.setProperty('--main-color', '#bb26d9'); // основной цвет
            //root.style.setProperty('--main-color', '#0c51d1'); // основной цвет для темной темы
            root.style.setProperty('--main-color', '#0f8921'); // основной цвет
            root.style.setProperty('--inverse-text-color', '#ffffff'); // текст для темной темы
            root.style.setProperty('--header-background-color', '#495057'); // цвет фона для заголовка в темной теме
            root.style.setProperty('--header-active-background-color', '#212529'); // цвет фона для активного заголовка в темной теме
            root.style.setProperty('--main-text-color', '#ffffff');
            root.style.setProperty('--light-text-color', '#d1d1d1');
            root.style.setProperty('--swiper-slide-background', '#212529');
            root.style.setProperty('--btn-color', '#ffffff');
            root.style.setProperty('--vector-color', '#212529');
            root.style.setProperty('--container-background-color', '#000000');
            body.style.backgroundColor = '#000000';
            // #root > div > main > section.InStock-module__in_stock--aatpm > div > div > div > ul > li:nth-child(24)
            // a.forEach((link) => {
            //     link.style.color = 'white'; // Correctly set the color for each anchor element
            // });
            // ul.forEach((list) => {
            //     list.style.color = 'black';
            // });
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
