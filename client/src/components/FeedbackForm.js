import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { createFeedback } from '../http/FeedbackAPI';
import DOMPurify from 'dompurify';

const FeedbackForm = () => {
    const initialValues = {
        email: '',
        text: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Некорректный email')
            .required('Поле email обязательно для заполнения')
            .matches(/@(mail\.ru|gmail\.com|yandex\.ru)$/, 'Неправильный домен почты'),
        text: Yup.string()
            .trim()
            .required('Поле текста обязательно для заполнения')
            .max(500, 'Максимальное количество символов - 500'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Очистка текста отзыва от потенциально опасных тегов и атрибутов
            const sanitizedText = DOMPurify.sanitize(values.text);
            await createFeedback(values.email, sanitizedText);
            alert('Отзыв успешно отправлен');
            resetForm();
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
            alert('Ошибка при отправке отзыва');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{marginTop:"20px"}}>
            <h3 >Оставьте обратную связь</h3>
             <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className='mt-4'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <Field
                            type="email"
                            name="email"
                            className={`form-control`}
                            id="email"
                            placeholder="Введите ваш email"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="text" className="form-label">Обратная связь</label>
                        <Field
                            as="textarea"
                            rows={3}
                            name="text"
                            className={`form-control`}
                            id="text"
                            placeholder="Напишите обратную связь тут! :)"
                        />
                        <ErrorMessage name="text" component="div" className="text-danger" />
                    </div>

                    <Button className='mt-2' variant="outline-success" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Отправить'}
                    </Button>
                </Form>
            )}
        </Formik>
        </div>
       
    );
};

export default FeedbackForm;
