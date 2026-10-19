'use client';

import { Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ReadPage() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarSeries() {
            try {
                const resp = await axios.get('/api/series?limit=50');
                setSeries(resp.data.data);
                toast.success('Séries carregadas!', { id: 'read' });
            } catch (error) {
                toast.error('Erro ao buscar as séries', { id: 'read' });
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        buscarSeries();
    }, []);

    return (
        <main>
            <h2>Get - FullStack</h2>
            <p>
                O navegador chama /api/series (nosso route.js); o servidor chama a API com a api-key
                privada.
            </p>
            <p>Abra o DevTools → Network: só aparece /api/series, sem x-api-key.</p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                </div>
            ) : (
                <ul>
                    {series.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}
