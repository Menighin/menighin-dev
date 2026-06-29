import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const users = [
    {
        id: '4b9bbbf7-c443-425f-a758-931013c18a31',
        name: 'João',
    },
    {
        id: 'b8d8e06a-8b7d-4ebc-ab87-1f5f499c5242',
        name: 'Marcilio',
    },
    {
        id: 'a0b2fdf3-8d3c-401a-b536-354abd12975b',
        name: 'Pão',
    },
    {
        id: 'db3cdb58-d073-42b0-a8a2-596c5e9e2f43',
        name: 'Lucas',
    },
    {
        id: '5f33fd2b-dfd4-4b86-9e08-e6bd3599e32a',
        name: 'Bruno',
    },
    {
        id: 'ca90ec69-d54a-4d85-a8e9-d0ed7f18df5a',
        name: 'Carlos',
    },
    {
        id: 'c23c4ea8-0660-4588-b60d-3c6d152e6199',
        name: 'Alex',
    },
];

const matchesResponse = await fetch('https://bolaodacopa2026.app/api/matches', {
    headers: {
        authorization: process.env.TOKEN,
        'content-type': 'application/json',
        'sec-ch-ua': '"Google Chrome";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        Referer: 'https://bolaodacopa2026.app/league/l-1781124156313?tab=classificacao',
    },
    body: null,
    method: 'GET',
});

if (!matchesResponse.ok) {
    console.error('Failed to fetch matches:', matchesResponse.status, matchesResponse.statusText);
    process.exit(1);
}

const matches = (await matchesResponse.json()).map((match) => ({
    id: match.id,
    homeTeamId: match.home_team_id,
    awayTeamId: match.away_team_id,
    date: new Date(match.date),
    status: match.status,
    phase: match.phase,
    points: [],
}));

const matchesById = matches.reduce((acc, match) => {
    acc[match.id] = match;
    return acc;
}, {});

for (const user of users) {
    const response = await fetch(
        `https://sjianpqzozufnobftksp.supabase.co/rest/v1/predictions?select=*&league_id=eq.l-1781124156313&user_id=eq.${user.id}`,
        {
            headers: {
                apikey: process.env.API_KEY,
                authorization: process.env.TOKEN,
            },
            method: 'GET',
        },
    );
    const predictions = await response.json();

    predictions.forEach((prediction) => {
        const match = matchesById[prediction.match_id];
        const user = users.find((user) => user.id === prediction.user_id);
        match.points.push({
            userId: user.id,
            userName: user.name,
            points: prediction.points,
        });
    });
}

matches.sort((a, b) => a.date - b.date);

await writeFile('../../public/data/bolao2026.json', JSON.stringify(matches, null, 2));

console.log('Data written to bolao2026.json');
