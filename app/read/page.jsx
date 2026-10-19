import SeriesList from '@components/SeriesListLinkSSR';
import { Skeleton } from 'antd';
import { Suspense } from 'react';

export default function ReadPage() {
    return (
        <main>
            <h2>Get - Read</h2>
            <p>
                O servidor chama a API com a api-key privada; o Skeleton aparece até as séries
                chegarem (Suspense).
            </p>
            <p>
                Abra o DevTools → Network: a chamada à API não aparece. Clique numa série para
                buscá-la pelo id.
            </p>
            <Suspense
                fallback={
                    <div className="skeleton">
                        <Skeleton active />
                    </div>
                }>
                <SeriesList />
            </Suspense>
        </main>
    );
}
