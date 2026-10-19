'use client';

import { useEffect, useState } from 'react';

export default function OfflinePage() {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const stored = sessionStorage.getItem('series');
        setSeries(stored ? JSON.parse(stored) : []);
    }, []);

    return (
        <main>
            <h2>Get - Offline</h2>
            <p>Lê as séries do sessionStorage, sem chamar a API. Visite o Get - SSR antes.</p>
            <p>Abra o DevTools → Network: nenhuma chamada à API.</p>
            <ul>
                {series.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </main>
    );
}
