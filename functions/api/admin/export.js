function c(v){const s=String(v??'');return '"' + s.replaceAll('"','""') + '"';}
export async function onRequestGet(context){
  try{
    const {results}=await context.env.DB.prepare(`
      SELECT a.candidate_id,a.submitted_at,a.nama,a.jantina,a.sekolah,
      a.komputer_rumah,a.telefon_penjaga,a.word,a.excel,a.ai,a.coding,
      a.sebab,a.teknologi,a.bila_sukar,
      COALESCE(e.score_motivasi,0) score_motivasi,
      COALESCE(e.score_teknologi,0) score_teknologi,
      COALESCE(e.score_kesukaran,0) score_kesukaran,
      COALESCE(e.score_motivasi,0)+COALESCE(e.score_teknologi,0)+COALESCE(e.score_kesukaran,0) jumlah_skor,
      COALESCE(e.status,'Belum Dinilai') status,
      COALESCE(e.catatan,'') catatan,
      COALESCE(e.evaluator_email,'') evaluator_email,e.updated_at
      FROM applications a LEFT JOIN evaluations e ON e.candidate_id=a.candidate_id
      ORDER BY jumlah_skor DESC,a.submitted_at ASC
    `).all();
    const h=['candidate_id','submitted_at','nama','jantina','sekolah','komputer_rumah','telefon_penjaga','word','excel','ai','coding','sebab','teknologi','bila_sukar','score_motivasi','score_teknologi','score_kesukaran','jumlah_skor','status','catatan','evaluator_email','updated_at'];
    const lines=[h.join(',')];
    for(const r of(results||[])) lines.push(h.map(k=>c(r[k])).join(','));
    return new Response('\ufeff'+lines.join('\n'),{headers:{'content-type':'text/csv; charset=utf-8','content-disposition':'attachment; filename="JFTA_selection_export.csv"'}});
  }catch(e){
    console.error('ADMIN EXPORT ERROR:',e);
    return Response.json({error:'Gagal export CSV.'},{status:500});
  }
}
