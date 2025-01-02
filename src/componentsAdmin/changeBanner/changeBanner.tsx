import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Typography, Row, Col, Modal, Checkbox } from 'antd';
import { useMessageContext } from '../../hoc/messageContext';

const { Title } = Typography;

export const ChangeBanner = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [form] = Form.useForm();
    const { showSuccess, showError } = useMessageContext();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fetchBanners = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/banners/banner_all`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBanners(data);
        } catch (error) {
            showError('Ошибка при загрузке баннеров');
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleAdd = () => {
        setEditingBanner(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (banner: any) => {
        setEditingBanner(banner);
        form.setFieldsValue({
            main_text: banner.text.main_text,
            second_text: banner.text.second_text,
            images: banner.images,
            status: banner.status,
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/banners/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showSuccess('Баннер успешно удален');
                setBanners(banners.filter((banner) => banner.id !== id));
            } else {
                showError('Ошибка при удалении баннера');
            }
        } catch (error) {
            showError('Ошибка при удалении баннера');
        }
    };

    const handleSubmit = async (values: any) => {
        setSubmitLoading(true);
        try {
            const method = editingBanner ? 'PATCH' : 'POST';
            const url = editingBanner
                ? `${process.env.REACT_APP_BASE_URL}/banners/${editingBanner.id}`
                : `${process.env.REACT_APP_BASE_URL}/banners`;

            const bannerData = {
                main_text: values.main_text,
                second_text: values.second_text,
                image: values.images,
                status: values.status,
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banner: bannerData }),
            });

            if (response.ok) {
                showSuccess(`Баннер успешно ${editingBanner ? 'обновлен' : 'добавлен'}`);
                setIsModalVisible(false);
                fetchBanners(); // Обновляем список баннеров
            } else {
                showError(`Ошибка при ${editingBanner ? 'обновлении' : 'добавлении'} баннера`);
            }
        } catch (error) {
            showError(`Ошибка при ${editingBanner ? 'обновлении' : 'добавлении'} баннера`);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={1} style={{ marginBottom: '20px' }}>
                Добавить/удалить баннеры
            </Title>

            <Button type="primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
                Добавить баннер
            </Button>

            <Row gutter={[16, 16]}>
                {banners.length > 0 ? (
                    banners.map((banner) => (
                        <Col
                            key={banner.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{ filter: banner.status ? 'none' : 'grayscale(1)' }}
                        >
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt="banner"
                                        src={banner.images}
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            filter: banner.status ? 'none' : 'grayscale(100%) brightness(0.8)',
                                        }}
                                    />
                                }
                                actions={[
                                    <Button key="edit" type="text" onClick={() => handleEdit(banner)}>
                                        Редактировать
                                    </Button>,
                                    <Button key="delete" type="text" danger onClick={() => handleDelete(banner.id)}>
                                        Удалить
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={Object.values(banner.text).join('\n')}
                                    description={banner.text.secondary_text}
                                />
                            </Card>
                        </Col>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Typography.Text type="secondary">Нет доступных баннеров</Typography.Text>
                    </div>
                )}
            </Row>

            <Modal
                title={`${editingBanner ? 'Редактировать' : 'Добавить'} баннер`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="main_text" rules={[{ required: true, message: 'Введите основной текст' }]}>
                        <Input placeholder="Основной текст первого слайда" />
                    </Form.Item>
                    <Form.Item name="second_text" rules={[{ required: true, message: 'Введите второстепенный текст' }]}>
                        <Input placeholder="Второстепенный текст первого слайда" />
                    </Form.Item>
                    <Form.Item name="images" rules={[{ required: true, message: 'Введите URL изображения' }]}>
                        <Input placeholder="URL изображения" />
                    </Form.Item>
                    <Form.Item name="status" valuePropName="checked">
                        <Checkbox checked={form.getFieldValue('status')}> Активный </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={submitLoading}>
                            {editingBanner ? 'Сохранить' : 'Добавить'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
