'use client';

import ConfirmDelete from '@components/confirmDelete';
import FormModal from '@components/formModal';
import { Button, Card, Skeleton } from 'antd';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ReadByPage() {
    const { id } = useParams();
    const [serie, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function buscarSeries() {
            try {
                const response = await axios.get(`/api/series/${id}`);
                setSeries(response.data);
            } catch (error) {
                toast.error('Série não encontrada.', { id: 'read-id' });
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            buscarSeries();
        }
    }, [id]);

    const handleUpdate = async (values) => {
        setSaving(true);

        try {
            await axios.put(`/api/series/${id}`, values);
            setSeries({ ...serie, ...values });
            setEditOpen(false);
            toast.success('Série atualizada com sucesso!', { id: 'update-success' });
        } catch (error) {
            toast.error('Erro ao atualizar a série.', { id: 'update-error' });
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);

        try {
            await axios.delete(`/api/series/${id}`);
            setSeries(null);
            setDeleteOpen(false);
            toast.success('Série excluída com sucesso!', { id: 'delete' });
        } catch (error) {
            toast.error('Erro ao excluir a série.', { id: 'delete' });
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <main>
            <h2>Get By Id - read{serie && ` - ${serie.title}`}</h2>
            <p>
                O navegador busca, edita e exclui pelo /api/series/{id} (nosso route.js); o servidor
                fala direto com a API usando a api-key privada.
            </p>
            <p>Abra o DevTools - Network: aparece a série (GET/PUT/DELETE), sem x-api-key.</p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                </div>
            ) : (
                serie && (
                    <>
                        <Card title={serie.title}>
                            <p>Gênero: {serie.genero}</p>
                            <p>Plataforma: {serie.plataforma}</p>
                            <p>Temporadas: {serie.numero_temporada}</p>
                            <p>Ano de lançamento: {serie.ano_lancamento}</p>
                        </Card>

                        <div className="actions">
                            <Button type="primary" onClick={() => setEditOpen(true)}>
                                Editar
                            </Button>
                            <Button type="danger" onClick={() => setDeleteOpen(true)}>
                                Excluir
                            </Button>
                        </div>

                        <FormModal
                            openModal={editOpen}
                            serie={serie}
                            confirmLoading={saving}
                            onSubmit={handleUpdate}
                            onCancel={() => setEditOpen(false)}
                        />

                        <ConfirmDelete
                            openModal={deleteOpen}
                            serie={serie}
                            confirmLoading={deleting}
                            onConfirm={handleDelete}
                            onCancel={() => setDeleteOpen(false)}
                        />
                    </>
                )
            )}
        </main>
    );
}
