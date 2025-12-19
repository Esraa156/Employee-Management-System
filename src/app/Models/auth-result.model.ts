// src/app/models/auth-result.model.ts
export interface AuthResultDTO {
  success: boolean;       // true لو login نجح
  token?: string;         // JWT token لو موجود
  fullName?: string;      // اسم المستخدم
  role?: string;          // دور المستخدم
  message?: string;       // رسالة خطأ لو فشل
}
