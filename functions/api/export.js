function csvCell(v){
  const s=String(v ?? '');
  return '"'+s.replaceAll('"','""')+'"';
}
export async function onRequestGet(context){
  const url=new URL(context.request.url);
  const key=url.searchParams.get('key')||'';
  if(!context.env.EXPORT_KEY || key !== context.env.EXPORT_KEY){
    return new Response('Unauthorized',{status:401});
  }
  const {results}=await context.env.DB.prepare('SELECT * FROM applications ORDER BY submitted_at ASC').all();
  const headers=['candidate_id','submitted_at','nama','jantina','sekolah','komputer_rumah','telefon_penjaga','word','excel','ai','coding','sebab','teknologi','bila_sukar','persetujuan'];
  const rows=[headers.join(',')].concat(results.map(r=>headers.map(h=>csvCell(r[h])).join(',')));
  return new Response('\ufeff'+rows.join('\n'),{
    headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="JFTA_applications.csv"','Cache-Control':'no-store'}
  });
}
