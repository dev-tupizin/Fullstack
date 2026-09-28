'use client';

import { Skeleton } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ReadPage() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    async function buscarSeries() {
        try {
            setLoading(true);

            const response = await axios.get('/api/series?limit=50');

            setSeries(response.data.data);
            toast.success('Séries carregadas', { id: 'read' });
        } catch (error) {
            toast.error('Erro ao buscar as séries', { id: 'read' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarSeries();
    }, []);

    return (
        <main>
            <h2>Read</h2>
            <p>
                Busca séries via /api/series (nossa API route.js), que fala com a Codeverse direto
                do servidor.
            </p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                </div>
            ) : (
                <ul>
                    {series.map((atual) => (
                        <li key={atual.id}>{atual.title}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}
