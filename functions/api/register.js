export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const required = ['candidate_id','nama','jantina','sekolah','sebab','teknologi','bila_sukar','persetujuan'];
    for (const key of required) {
      if (!data[key] || String(data[key]).trim() === '') {
        return Response.json({ ok:false, error:`Medan ${key} diperlukan.` }, { status:400 });
      }
    }

    const now = new Date().toISOString();
    const ip = context.request.headers.get('CF-Connecting-IP') || '';
    const ua = context.request.headers.get('User-Agent') || '';

    await context.env.DB.prepare(`
      INSERT INTO applications
      (candidate_id, submitted_at, nama, jantina, sekolah, komputer_rumah, telefon_penjaga,
       word, excel, ai, coding, sebab, teknologi, bila_sukar, persetujuan, ip_hash_hint, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidate_id, now, data.nama, data.jantina, data.sekolah,
      data.komputer_rumah || '', data.telefon_penjaga || '',
      data.word || 'Tidak', data.excel || 'Tidak', data.ai || 'Tidak', data.coding || 'Tidak',
      data.sebab, data.teknologi, data.bila_sukar, data.persetujuan,
      ip ? ip.split('.').slice(0,2).join('.') + '.x.x' : '', ua.slice(0,250)
    ).run();

    return Response.json({ ok:true, candidate_id:data.candidate_id });
    } catch (e) {
    const msg = String(e?.message || e);

    console.error('REGISTER ERROR:', msg);
    console.error(e);

    if (msg.includes('UNIQUE constraint failed')) {
      return Response.json(
        { ok:false, error:'ID calon ini telah dihantar. Sila muat semula halaman.' },
        { status:409 }
      );
    }

    return Response.json(
      { ok:false, error:'Ralat pangkalan data. Sila cuba semula.' },
      { status:500 }
    );
  }
}
