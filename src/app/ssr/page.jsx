import SeriesList from '@components/SeliesList';
import axios from "axios";

export default async function GetPage() {
  let series;

  try {
    const resp = await axios.get(`${process.env.API_URL_SERIES}?limit=50`, {
        headers: { 'x-api-key': process.env.API_KEY },
    });

    series = resp.data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <h2>Busca feito pelo servidor, com a api-key privada.</h2>
      <p>DevTools - Network : essa chamada nem aparece lá, pois ela acontece no servidor.</p>
        <SeriesList series={series}/>
    </main>
  );
}
