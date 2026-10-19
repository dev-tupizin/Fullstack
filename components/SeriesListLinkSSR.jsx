import axios from 'axios';
import Link from 'next/link';

export default async function Series() {
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
        <ul>
            {series.map((item) => (
                <li key={item.id}>
                    <Link href={`/read/${item.id}`}>{item.title}</Link>
                </li>
            ))}
        </ul>
    );
}
