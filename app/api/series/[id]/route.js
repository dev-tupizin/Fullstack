import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(_req, { params }) {
    const { id } = await params;

    try {
        const res = await axios.get(`${process.env.API_URL_SERIES}/${id}`, {
            headers: { 'x-api-key': process.env.API_KEY },
        });

        return NextResponse.json(res.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao buscar a série.' };

        return NextResponse.json(data, { status });
    }
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const body = await req.json();

    try {
        const res = await axios.put(`${process.env.API_URL_SERIES}/${id}`, body, {
            headers: { 'x-api-key': process.env.API_KEY },
        });

        return NextResponse.json(res.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao atualizar a série.' };

        return NextResponse.json(data, { status });
    }
}

export async function DELETE(_req, { params }) {
    const { id } = await params;

    try {
        await axios.delete(`${process.env.API_URL_SERIES}/${id}`, {
            headers: { 'x-api-key': process.env.API_KEY },
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao excluir a série.' };

        return NextResponse.json(data, { status });
    }
}
