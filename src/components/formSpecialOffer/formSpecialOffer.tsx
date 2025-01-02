import React from 'react';
import { CheckboxAgree } from '../checkboxAgree/CheckboxAgree';
import { FormField } from '../formField/FormField';
import { FormFieldPhone } from '../formFieldPhone/FormFieldPhone';
import { FormSendButton } from '../formSendButton/FormSendButton';
import styles from './formSpecialOffer.module.scss';
import { useForm } from 'react-hook-form';
import { SpecialOfferData } from '../../interfaces/formQuery.interface';

type FormSpecialOfferProps = {
    brand: string;
    model: string;
};

const FormSpecialOffer = (props: FormSpecialOfferProps): React.JSX.Element => {
    const { brand, model } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SpecialOfferData>({
        mode: 'onSubmit',
        defaultValues: {
            agree: true,
            agree_country: true,
        },
        resolver: (values) => {
            const errorsResolver: Record<string, any> = {};

            if (!values.name) {
                errorsResolver.name = { type: 'required', message: 'Обязательное поле' };
            }

            if (!values.phone) {
                errorsResolver.phone = { type: 'required', message: 'Обязательное поле' };
            }

            return {
                values,
                errors: errorsResolver,
            };
        },
    });

    const onSubmit = () => {
        console.log('Submit');
    };

    return (
        <form className={styles.special_offer_form_container} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.special_offer_title}>
                <p>{`Получи индивидуальное предложение на покупку ${brand} ${model}`}</p>
            </div>
            <FormField
                id="installment_your_name"
                placeholder="ФИО"
                register={register('name', {
                    required: true,
                    minLength: {
                        value: 2,
                        message: 'Минимальная длина - 2 символа.',
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
                        message: 'Используйте только буквы, пробел или дефис',
                    },
                })}
                isError={Boolean(errors.name)}
            />
            <FormFieldPhone id="installment_credit_phone" isError={Boolean(errors.phone)} register={register} />
            <CheckboxAgree
                id="installment_agree"
                isError={Boolean(errors.agree)}
                register={register('agree', { required: true })}
            />
            <FormSendButton textContent="Получить предложение" />
        </form>
    );
};

export default FormSpecialOffer;
