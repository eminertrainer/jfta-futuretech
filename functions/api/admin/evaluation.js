export async function onRequestPost(context) {
  try {
    const d=await context.request.json();
    const mot=Number(d.score_motivasi), tech=Number(d.score_teknologi), res=Number(d.score_kesukaran);
    if(!d.candidate_id) return Response.json({error:'candidate_id diperlukan'},{status:400});
    if(!Number.isInteger(mot)||mot<0||mot>4) return Response.json({error:'Skor motivasi mesti 0-4'},{status:400});
    if(!Number.isInteger(tech)||tech<0||tech>2) return Response.json({error:'Skor teknologi mesti 0-2'},{status:400});
    if(!Number.isInteger(res)||res<0||res>4) return Response.json({error:'Skor kesukaran mesti 0-4'},{status:400});
    const allowed=['Belum Dinilai','Shortlist','Dipilih','Simpanan','Tidak Dipilih'];
    if(!allowed.includes(d.status)) return Response.json({error:'Status tidak sah'},{status:400});
    const now=new Date().toISOString();
    const email=context.request.headers.get('Cf-Access-Authenticated-User-Email')||'';
    await context.env.DB.prepare(`
      INSERT INTO evaluations
      (candidate_id,score_motivasi,score_teknologi,score_kesukaran,status,catatan,evaluator_email,updated_at)
      VALUES (?,?,?,?,?,?,?,?)
      ON CONFLICT(candidate_id) DO UPDATE SET
        score_motivasi=excluded.score_motivasi,
        score_teknologi=excluded.score_teknologi,
        score_kesukaran=excluded.score_kesukaran,
        status=excluded.status,
        catatan=excluded.catatan,
        evaluator_email=excluded.evaluator_email,
        updated_at=excluded.updated_at
    `).bind(d.candidate_id,mot,tech,res,d.status,String(d.catatan||'').slice(0,2000),email,now).run();
    return Response.json({ok:true});
  } catch(e) {
    console.error('ADMIN EVALUATION ERROR:',e);
    return Response.json({error:'Gagal menyimpan penilaian.'},{status:500});
  }
}
