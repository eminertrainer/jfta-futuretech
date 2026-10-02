export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB.prepare(`
      SELECT a.candidate_id,a.submitted_at,a.nama,a.jantina,a.sekolah,
        a.komputer_rumah,a.telefon_penjaga,a.word,a.excel,a.ai,a.coding,
        a.sebab,a.teknologi,a.bila_sukar,a.persetujuan,
        COALESCE(e.score_motivasi,0) score_motivasi,
        COALESCE(e.score_teknologi,0) score_teknologi,
        COALESCE(e.score_kesukaran,0) score_kesukaran,
        COALESCE(e.status,'Belum Dinilai') status,
        COALESCE(e.catatan,'') catatan,e.updated_at
      FROM applications a LEFT JOIN evaluations e ON e.candidate_id=a.candidate_id
      ORDER BY a.submitted_at DESC
    `).all();
    return Response.json(results || []);
  } catch (e) {
    console.error('ADMIN APPLICATIONS ERROR:', e);
    return Response.json({error:'Gagal memuatkan permohonan.'},{status:500});
  }
}
