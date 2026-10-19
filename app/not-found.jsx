'use client';

import { Result } from 'antd';

export default function NotFound() {
    return (
        <main>
            <Result
                status="404"
                title="404"
                subTitle="A página que você está procurando não existe."
            />
        </main>
    );
}
