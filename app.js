const people={
"احمد زويل":{name:"أحمد زويل",birth:"1946",death:"2016",age:"70 عامًا",field:"عالم كيمياء مصري",place:"دمنهور، مصر",bio:"عالم مصري بارز في مجال كيمياء الفيمتوثانية، وحاصل على جائزة نوبل في الكيمياء عام 1999."},
"صلاح جاهين":{name:"صلاح جاهين",birth:"1930",death:"1986",age:"55 عامًا",field:"شاعر ورسام وكاتب مصري",place:"القاهرة، مصر",bio:"شاعر ورسام وكاتب مصري ارتبط اسمه بالشعر والرسوم الكاريكاتيرية والأعمال الفنية."},
"نجيب محفوظ":{name:"نجيب محفوظ",birth:"1911",death:"2006",age:"94 عامًا",field:"روائي وأديب مصري",place:"القاهرة، مصر",bio:"روائي وأديب مصري حاز جائزة نوبل في الأدب عام 1988، وله حضور بارز في الأدب العربي الحديث."}
};

function meet(){
 const input=document.getElementById("name");
 const key=input.value.trim().replace(/أ/g,"ا").replace(/إ/g,"ا").replace(/آ/g,"ا");
 const found=Object.values(people).find(p=>p.name.replace(/أ/g,"ا").replace(/إ/g,"ا").replace(/آ/g,"ا").toLowerCase()===key.toLowerCase());
 const r=document.getElementById("result");
 r.classList.remove("hidden");
 if(!found){
  r.innerHTML=`<div class="card"><div class="portrait">🕯️</div><h2>لم نجد السجل</h2><p class="status">جرّب اسمًا آخر من الأسماء المتاحة في النسخة التجريبية.</p></div>`;
  return;
 }
 r.innerHTML=`<div class="card">
 <div class="portrait">🕯️</div>
 <h2>${found.name}</h2><p class="status">سجل تذكاري</p>
 <div class="facts">
 <div class="fact"><small>الميلاد</small>${found.birth}</div>
 <div class="fact"><small>الوفاة</small>${found.death}</div>
 <div class="fact"><small>العمر</small>${found.age}</div>
 <div class="fact"><small>المجال</small>${found.field}</div>
 <div class="fact"><small>المكان</small>${found.place}</div>
 </div>
 <p class="lead">${found.bio}</p>
 <button class="begin" onclick="startMeeting('${found.name}')">🕯️ بدء اللقاء الفني</button>
 <p class="disclaimer">المشهد التالي تصور فني مولّد بالذكاء الاصطناعي اعتمادًا على معلومات عامة، وليس صورة حقيقية أو تواصلًا مع المتوفى.</p>
 </div>`;
 r.scrollIntoView({behavior:"smooth"});
}

function startMeeting(name){
 const r=document.getElementById("result");
 r.innerHTML=`<div class="card"><div class="portrait">🕯️</div><h2>بدأ اللقاء</h2>
 <p class="status">أنت الآن في تجربة تذكارية عن ${name}</p>
 <p class="lead">هنا يمكن لاحقًا ربط الموقع بمحرك توليد صور لإنشاء تصور فني للمشهد، مع الحفاظ على تنبيه واضح بأنه عمل خيالي وليس تسجيلًا حقيقيًا.</p>
 <button class="begin" onclick="location.reload()">إنهاء اللقاء</button></div>`;
}