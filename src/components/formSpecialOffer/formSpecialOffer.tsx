import React from 'react';
import { CheckboxAgree } from '../checkboxAgree/CheckboxAgree';
import { FormField } from '../formField/FormField';
import { FormFieldPhone } from '../formFieldPhone/FormFieldPhone';
import { FormSendButton } from '../formSendButton/FormSendButton';
import styles from './formSpecialOffer.module.scss';
import { useForm } from 'react-hook-form';
import { CallbackFormData, CallbackPostQuery } from '../../interfaces/formQuery.interface';
import { SuccessInformation } from '../../interfaces/form.interface';
import { customFetch } from '../../helpers/customFetch';
import { useNavigate } from 'react-router-dom';

type FormSpecialOfferProps = {
    brand: string;
    model: string;
};

const FormSpecialOffer = (props: FormSpecialOfferProps): React.JSX.Element => {
    const { brand, model } = props;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CallbackFormData>({
        mode: 'onSubmit',
        defaultValues: {
            agree: true,
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

    const onSubmit = async (data: CallbackFormData) => {
        const dataQuery = {
            call_request: {
                car_id: null,
                name: data.name,
                phone: data.phone,
                preferred_time: 'Как можно скорее',
            } as CallbackPostQuery,
        };

        const successInformation: SuccessInformation = {
            user_name: data.name,
            from: 'Заявка на обратный звонок принята',
        };

        try {
            await customFetch({ url: 'call_requests', data: JSON.stringify(dataQuery), method: 'POST' });
            navigate('/success', { state: successInformation, replace: true });
            reset();
        } catch (error) {
            console.log(error);
        }
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
