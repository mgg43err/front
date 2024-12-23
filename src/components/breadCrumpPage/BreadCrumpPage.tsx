import React from 'react';
import styles from './BreadCrumpPage.module.scss';

type BreadCrumpPageProps = {
    links: {
        name: string;
        url: string;
    }[];
};

export const BreadCrumpPage = (props: BreadCrumpPageProps): React.JSX.Element => {
    const links = props.links;
    return (
        <div className={styles.breadCrump}>
            {links.slice(0, links.length - 1).map((link) => (
                <a className={styles.breadCrump__item} href={link.url}>
                    {link.name}
                </a>
            ))}
            <a
                className={`${styles.breadCrump__item} ${styles.breadCrump__item_active}`}
                href={links[links.length - 1].url}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
            >
                {links[links.length - 1].name}
            </a>
        </div>
    );
};
