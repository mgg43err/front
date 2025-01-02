import React from 'react';
import benefits from './benefits.json';
import extraInformation from './extraInformation.json';
import styles from './Credit.module.scss';
import { BanksList } from '../../components/banksList/BanksList';
import { Benefits } from '../../components/benefits/Benefits';
import { CreditAbout } from '../../components/creditAbout/CreditAbout';
import { CreditOffersList } from '../../components/creditOffersList/CreditOffersList';
import { ExtraInformation } from '../../components/extraInformation/ExtraInformation';
import { FormCredit } from '../../components/formCredit/FormCredit';
import { modalSelector } from '../../redux/selectors';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreditForm } from '../../hook/useCreditForm';
import { CardAutoHorizontal } from '../../components/cardAutoHorizontal/CardAutoHorizontal';
import { banksListSelector } from '../../redux/selectors';
import { convertToUrl } from '../../helpers/convertToUrl';
import { setTargetBankId } from '../../redux/slice/banksListSlice';
import type { AutoCard } from '../../interfaces/cars.interface';
import type { Bank } from '../../interfaces/banks.interface';
import { BreadCrumpPage } from '../../components/breadCrumpPage/BreadCrumpPage';

export const Credit = (): React.JSX.Element => {
    const { register, errors, onSubmit, handleSubmit, sliderField, setValue, payment } = useCreditForm();
    const dispatch = useDispatch();
    const fromBanks = useLocation().pathname.split('/')[2];
    const selectCar: AutoCard = useSelector(modalSelector).selectCar.filter.car.carSelect;
    const bankList: Bank[] = useSelector(banksListSelector).banksList;

    const getInitialLinks = () => {
        const initialLinks = [
            { name: 'Главная', url: '/' },
            { name: 'Автокредит', url: '/credit' },
        ];

        if (fromBanks && bankList.length > 0) {
            const targetBank = bankList.find((bank) => convertToUrl(bank.name) === fromBanks);
            if (targetBank) {
                initialLinks.push({ name: targetBank.name, url: '' });
            }
        }

        return initialLinks;
    };

    const [links, setLinks] = React.useState(getInitialLinks());

    React.useEffect(() => {
        if (bankList.length > 0 && fromBanks) {
            const targetBank = bankList.find((bank) => convertToUrl(bank.name) === fromBanks);
            dispatch(setTargetBankId(targetBank?.id || null));

            setLinks([
                { name: 'Главная', url: '/' },
                { name: 'Автокредит', url: '/credit' },
                ...(targetBank ? [{ name: targetBank.name, url: '' }] : []),
            ]);
        }
    }, [bankList, fromBanks, dispatch]);

    return (
        <div className="container">
            <div className={`${styles.credit} page`}>
                <BreadCrumpPage links={links} />
                <h1 className={`${styles.credit__title} page__title`}>Автокредит от 4.9%</h1>
                <Benefits benefits={benefits} />

                <div className={styles.credit__content}>
                    <aside className={styles.credit__column_form}>
                        <FormCredit {...{ register, errors, onSubmit, handleSubmit, sliderField, setValue, payment }} />
                        <ExtraInformation {...extraInformation} />
                    </aside>

                    <section className={styles.credit__column_about}>
                        {selectCar?.brand ? <CardAutoHorizontal {...selectCar} /> : null}
                        {!fromBanks ? <CreditOffersList payment={payment} /> : null}
                        <CreditAbout />
                    </section>
                </div>

                <div className={styles.credit__banks}>
                    <h2 className={styles.credit__banks_title}>Банки-партнеры</h2>
                    <BanksList />
                </div>
            </div>
        </div>
    );
};
