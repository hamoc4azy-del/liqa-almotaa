import 'dotenv/config';
export const config={
 port:Number(process.env.PORT||4000), dbUrl:process.env.DATABASE_URL||'file:./dev.db', jwtSecret:process.env.JWT_SECRET||'dev-secret',
 adminEmail:process.env.ADMIN_EMAIL||'admin@liqaa.local', adminPassword:process.env.ADMIN_PASSWORD||'ChangeMe', webOrigin:process.env.WEB_ORIGIN||'http://localhost:3000',
 publicApiUrl:process.env.PUBLIC_API_URL||'http://localhost:4000', videoProvider:process.env.VIDEO_PROVIDER||'mock', replicateToken:process.env.REPLICATE_API_TOKEN||'', replicateOwner:process.env.REPLICATE_MODEL_OWNER||'', replicateModel:process.env.REPLICATE_MODEL_NAME||'', replicateWebhookSecret:process.env.REPLICATE_WEBHOOK_SECRET||''
};
