'use client';

import { Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ApiKeyPage() {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function buscarSeries() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_SERIES}?limit=50`, {
                    headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY },
                });
                setSeries(res.data.data);
                toast.success('Séries carregadas!', { id: 'getApiKey' });
            } catch (error) {
                toast.error('Erro ao buscar as séries.', { id: 'getApiKey' });
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        buscarSeries();
    }, []);

    return (
        <main>
            <h2>Get - ApiKey exposta</h2>
            <p>O navegador chama a API direto, enviando a api-key → ela fica exposta.</p>
            <p>Abra o DevTools → Network → Headers → x-api-key.</p>
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
