# لقاء الموتى — Liqaa Al-Mawta

تجربة تذكارية/فنية عربية RTL، مبنية لتبدو كعمل سينمائي مظلم وليس Dashboard تقليديًا.

> **تنبيه مهم:** هذا المنتج تجربة فنية وتذكارية رقمية. لا يدّعي التواصل الحقيقي مع الموتى، وأي مشهد أو صوت مولّد بالذكاء الاصطناعي هو إعادة تخيّل فنية.

## التقنية
- Frontend: Next.js + TypeScript + CSS Modules/global CSS
- Backend: Fastify + TypeScript
- Database: Prisma + SQLite للتطوير، مع تعليمات التحويل إلى PostgreSQL للإنتاج
- Auth: JWT + bcryptjs للوحة الإدارة
- Uploads: تخزين محلي آمن للتطوير، قابل لاستبداله بـ S3/R2
- Video: `MockVideoProvider` افتراضيًا + `ReplicateVideoProvider` كتكامل حقيقي عبر REST/webhook

## التشغيل

المتطلبات: Node.js 20+

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run db:push
npm run db:seed
npm run dev
```

- الواجهة: http://localhost:3000
- الـ API: http://localhost:4000
- فحص الصحة: http://localhost:4000/health

بيانات المدير الافتراضية من `.env`:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

غيّر كلمة المرور فورًا في بيئة الإنتاج.

## Video Provider
الافتراضي `mock`، لذلك الموقع يعمل بلا أي مفتاح API. عند وضع:

```env
VIDEO_PROVIDER=replicate
REPLICATE_API_TOKEN=...
REPLICATE_MODEL_OWNER=...
REPLICATE_MODEL_NAME=...
PUBLIC_API_URL=https://api.example.com
```

سيستخدم الـ API مزود Replicate. يرسل الـ backend طلبًا غير متزامنًا مع webhook ويخزن `provider_job_id`. لا يتم كشف المفتاح للواجهة.

> يجب اختيار موديل فيديو فعلي مناسب في Replicate وإدخال اسم المالك/الموديل وحقول الإدخال الخاصة به في `apps/api/src/providers/replicate.ts`. الكود الحالي يعزل هذه النقطة فقط، ولا يختلق نموذجًا أو نتيجة.

## لماذا webhook + polling؟
الواجهة تستعلم عن حالة الطلب من الـ API، والـ backend يمكنه استقبال webhook من مزود الفيديو لتحديث الحالة. هذا يطابق نمط jobs الطويلة. Replicate يدعم async predictions وwebhooks رسميًا. راجع توثيق Replicate قبل الإنتاج.

## رفع الملفات
التخزين المحلي موجود في `apps/api/uploads`. الامتدادات المسموحة JPG/PNG/WEBP، والحجم 8MB. يتم فحص MIME بالإضافة إلى الامتداد، واسم الملف يعاد توليده UUID.

للإنتاج، ضع طبقة S3/R2 بدل `LocalStorage` مع نفس الواجهة `StorageAdapter`.

## API routes
- `POST /api/requests` إنشاء طلب
- `GET /api/requests/:id` تفاصيل طلب عام حسب الخصوصية
- `GET /api/requests/:id/status` حالة التجهيز
- `POST /api/requests/:id/generate` بدء توليد الفيديو
- `POST /api/uploads/image` رفع صورة
- `GET /api/search?q=` البحث العام
- `POST /api/admin/login` دخول الإدارة
- `GET /api/admin/stats` إحصائيات
- `GET /api/admin/requests` الطلبات
- `PATCH /api/admin/requests/:id` تعديل حالة/موعد/خصوصية
- `DELETE /api/admin/requests/:id` حذف
- `POST /api/webhooks/replicate` webhook

## GitHub
```bash
git init
git add .
git commit -m "Initial Liqaa Al-Mawta build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/liqaa-almawta.git
git push -u origin main
```

## النشر
يمكن نشر Next.js على Vercel وFastify على Render/Fly.io/Railway، وقاعدة البيانات على PostgreSQL مُدارة. اجعل `NEXT_PUBLIC_API_URL` يشير إلى الـ backend العام، و`PUBLIC_API_URL` عنوان الـ backend نفسه حتى يستطيع مزود الفيديو الوصول إلى webhook عبر HTTPS.

## SEO
يوجد `sitemap.ts`, `robots.ts`, metadata, Open Graph، وJSON-LD في الصفحة الرئيسية.

## ملاحظات أمان الإنتاج
- استخدم HTTPS.
- غيّر `JWT_SECRET` وبيانات المدير.
- استخدم PostgreSQL بدل SQLite.
- استبدل التخزين المحلي بـ S3/R2.
- ضع reverse proxy/WAF أمام الـ API.
- لا تسجل نصوص الرسائل أو الصور في logs.
- استخدم secret لتوقيع webhook الخاص بمزود الفيديو.
