'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/components/ToastProvider';

export default function UyeOl() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    phone: '',
    school: '',
    grade: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Ad zorunludur';
    if (!formData.lastName.trim()) newErrors.lastName = 'Soyad zorunludur';
    if (!formData.email.trim()) newErrors.email = 'E-posta zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli e-posta girin';
    if (!formData.password) newErrors.password = 'Şifre zorunludur';
    else if (formData.password.length < 6) newErrors.password = 'Şifre en az 6 karakter';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Kullanım şartlarını kabul etmelisiniz';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Firestore'a ekstra bilgileri kaydet
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        school: formData.school || null,
        grade: formData.grade || null,
        createdAt: serverTimestamp()
      });

      addToast('Hesabınız oluşturuldu! Lütfen e-posta doğrulamasını tamamlayın.', 'success');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        phone: '',
        school: '',
        grade: ''
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        addToast('Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin veya şifrenizi sıfırlayın.', 'error');
      } else {
        addToast(err.message || 'Kayıt sırasında hata oluştu', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Üye Ol</h1>
          <p className="mt-2 text-base text-gray-600 dark:text-slate-300">Hızlıca hesabınızı oluşturun ve denemelere başlayın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Sol bilgilendirme paneli */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-full shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Üyelik Avantajları</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span> Gerçek TYT/AYT formatında, süreli ve açıklamalı denemeler</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span> Anlık sonuçlar: net/puan, konu-kazanım bazlı detaylı analiz</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span> Türkiye geneli sıralama ve karşılaştırmalı başarı raporları</li>
              </ul>
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-4 text-sm">
                <p className="text-slate-600 dark:text-slate-300">Zaten hesabınız var mı? <Link href="/giris-yap" className="text-blue-600 hover:underline">Giriş yapın</Link>.</p>
              </div>
            </div>
          </div>

          {/* Sağ form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-blue-700 dark:text-slate-300 border border-blue-100 dark:border-slate-700">Hızlı Kayıt</div>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-slate-100">Hesap Bilgileri</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">E-posta doğrulaması ile hesabınız güvence altında.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Ad</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input type="text" id="firstName" name="firstName" placeholder="Ad" value={formData.firstName} onChange={handleChange} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'firstName-error' : undefined} className={`w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.firstName ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`} />
                  </div>
                  {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Soyad</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input type="text" id="lastName" name="lastName" placeholder="Soyad" value={formData.lastName} onChange={handleChange} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'lastName-error' : undefined} className={`w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.lastName ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`} />
                  </div>
                  {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">E-posta</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l8 5 8-5"/><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/></svg>
                  </span>
                  <input type="email" id="email" name="email" placeholder="E-posta" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={`w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`} />
                </div>
                {errors.email ? (
                  <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                ) : (
                  <p className="text-xs text-slate-500 mt-1">Örn: ad.soyad@example.com</p>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Şifre</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Şifre" value={formData.password} onChange={handleChange} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} className={`w-full pl-10 pr-11 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.password ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                      {showPassword ? (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.77 2.98-5.1 5.47-6.57"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/><path d="M16.12 7.88A10.94 10.94 0 0 1 23 12c-.5 1.36-1.24 2.61-2.16 3.68"/></svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.password ? (
                    <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-1">En az 6 karakter olmalıdır.</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Şifre Tekrar</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" placeholder="Şifre Tekrar" value={formData.confirmPassword} onChange={handleChange} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined} className={`w-full pl-10 pr-11 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`} />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.77 2.98-5.1 5.47-6.57"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/><path d="M16.12 7.88A10.94 10.94 0 0 1 23 12c-.5 1.36-1.24 2.61-2.16 3.68"/></svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

        {/* Ek bilgiler */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Telefon (opsiyonel)</label>
                  <input type="text" id="phone" name="phone" placeholder="05xx xxx xx xx" value={formData.phone} onChange={handleChange} className="w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 border-gray-300 dark:border-slate-600" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Okul (opsiyonel)</label>
                  <input type="text" id="school" name="school" placeholder="Okul adınız" value={formData.school} onChange={handleChange} className="w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 border-gray-300 dark:border-slate-600" />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Sınıf (opsiyonel)</label>
                  <input type="text" id="grade" name="grade" placeholder="Örn: 11" value={formData.grade} onChange={handleChange} className="w-full px-3 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 border-gray-300 dark:border-slate-600" />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="h-4 w-4 mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700 dark:text-slate-300">Kullanım şartlarını kabul ediyorum</label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}

              <button type="submit" disabled={isLoading} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors shadow-sm">
          {isLoading ? 'Yükleniyor...' : 'Üye Ol'}
        </button>

              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                  <span className="text-xs text-slate-500">veya</span>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-slate-300">Zaten hesabınız var mı? <Link href="/giris-yap" className="text-blue-600 hover:underline">Giriş Yap</Link></p>
              </div>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
}
