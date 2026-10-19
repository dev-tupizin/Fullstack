import SeriesList from '@components/SeriesList';
import axios from 'axios';

export default async function GetPage() {
    let series = [];

    try {
        const res = await axios.get(`${process.env.API_URL_SERIES}?limit=50`, {
            headers: { 'x-api-key': process.env.API_KEY },
        });
        series = res.data.data;
    } catch (error) {
        console.error(error);
    }

    return (
        <main>
            <h2>Get - SSR</h2>
            <p>
                O servidor chama a API com a api-key privada e envia as séries prontas; o navegador
                salva no sessionStorage.
            </p>
            <p>
                Abra o DevTools → Network: a chamada não aparece. → Application → Session Storage:
                os dados estão lá.
            </p>
            <SeriesList series={series} />
        </main>
    );
}
