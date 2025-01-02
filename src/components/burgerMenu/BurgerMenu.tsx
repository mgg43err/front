import React from 'react';
import styles from './BurgerMenu.module.scss';
import { Link } from 'react-router-dom';
import { modalSelector } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slice/modalSlice';
import type { MenuElement } from '../../interfaces/header.interface';
import type { AppDispatch } from '../../redux/store';
import themeIcon from '../../assets/images/icon_them.png';
import { useTheme } from '../../context/ThemeContext';

export const BurgerMenu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const handleFollowLink = (): void => {
        dispatch(closeModal('burgerMenu'));
    };
    const menu: MenuElement[] = useSelector(modalSelector).burgerMenu.menuNavigation;
    const menuState: boolean = useSelector(modalSelector).burgerMenu.modalState;
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`${styles.burger_menu} ${menuState ? styles.burger_menu_active : ''}`}>
            <ul className={styles.burger_menu__list}>
                {menu.map(({ name, link }) => {
                    return (
                        <li className={styles.burger_menu__item} key={name} onClick={handleFollowLink}>
                            <Link className={styles.burger_menu__link} to={link}>
                                {name}
                            </Link>
                        </li>
                    );
                })}
                <li
                    className={`${styles.burger_menu__item} ${styles[theme]}`}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <span style={{ padding: '16px' }}>
                        {' '}
                        {/* Убираем width и height */}
                        Сменить тему:
                    </span>
                    <img
                        onClick={toggleTheme}
                        id="theme-icon"
                        className={styles.theme_toggle}
                        src={themeIcon}
                        alt="Theme Icon"
                        style={{ width: '32px', height: '32px', margin: '6px', marginLeft: '6px' }}
                    />
                </li>
            </ul>
        </nav>
    );
};
