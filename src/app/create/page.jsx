'use client';

import FormModal from '../../components/formModal';
import { Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePage() {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            await axios.post('/api/series', values);
            setOpenModal(false);
            toast.success('Série criada!', { id: 'create' });
        } catch (error) {
            toast.error('Erro ao criar série.', { id: 'create' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h2>Post - Create</h2>
            <Button type="primary" onClick={() => setOpenModal(true)}>
                nova série
            </Button>
            <FormModal
                openModal={openModal}
                confirmLoading={loading}
                onSubmit={handleSubmit}
                onCancel={() => setOpenModal(false)}
            />
        </main>
    );
}
