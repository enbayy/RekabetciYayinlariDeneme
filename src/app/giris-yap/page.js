'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, sendEmailVerification, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { useToast } from '@/components/ToastProvider';

export default function GirisYap() {
  const router = useRouter();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 LocalStorage'dan kayıtlı bilgileri yükle
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && savedEmail) {
      setFormData({
        email: savedEmail,
        password: savedPassword || '',
        rememberMe: true
      });
    }
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'E-posta alanı zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta adresi girin';
    if (!formData.password) newErrors.password = 'Şifre alanı zorunludur';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      // 🔹 Firebase oturum kalıcılığı
      await setPersistence(
        auth,
        formData.rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      // 🔹 Giriş yap
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        addToast("E-posta doğrulamanız tamamlanmamış. Doğrulama e-postası gönderildi.", "error");
        setIsLoading(false);
        return;
      }

      // 🔹 "Beni hatırla" seçiliyse bilgileri kaydet
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
        localStorage.setItem('rememberedPassword', formData.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
      }

      addToast("Giriş başarılı!", "success");
      router.push('/');

    } catch (err) {
      console.error('Login error:', err);

      let message = "Bir hata oluştu.";
      if (err.code === 'auth/user-not-found') message = "Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.";
      else if (err.code === 'auth/wrong-password') message = "Şifre yanlış.";
      else if (err.code === 'auth/too-many-requests') message = "Çok fazla başarısız giriş denemesi. Lütfen bir süre bekleyin.";
      else if (err.code === 'auth/user-disabled') message = "Bu kullanıcı devre dışı bırakılmış.";

      addToast(message, "error");
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-10 text-gray-900 dark:text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Giriş Yap</h1>
          <p className="mt-2 text-base text-gray-600 dark:text-slate-300">Hesabınıza giriş yapın ve deneme sınavlarına başlayın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-full shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Neden Rekabetçi Yayınları?</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>Gerçek sınav formatında denemeler ve ayrıntılı analizler</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>Kişiselleştirilmiş geribildirim ve gelişim takibi</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>Aydınlık/Karanlık tema ve modern arayüz</li>
              </ul>
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 p-4 text-sm">
                <p className="text-slate-600 dark:text-slate-300">Hesabınız yoksa hemen <Link href="/uye-ol" className="text-blue-600 hover:underline">üye olun</Link> ve ücretsiz içerikleri keşfedin.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-blue-700 dark:text-slate-300 border border-blue-100 dark:border-slate-700">Güvenli Giriş</div>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-slate-100">Hesabınıza Giriş Yapın</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">E-posta doğrulaması olan kullanıcılar giriş yapabilir.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">E-posta</label>
                  <div className="relative"> 
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l8 5 8-5"/><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/></svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`}
                      placeholder="ornek@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Şifre</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-11 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.password ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300 dark:border-slate-600'}`}
                      placeholder="Şifrenizi girin"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.77 2.98-5.1 5.47-6.57"/><path d="M1 1l22 22"/><path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/><path d="M16.12 7.88A10.94 10.94 0 0 1 23 12c-.5 1.36-1.24 2.61-2.16 3.68"/></svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="rememberMe" className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-slate-300">Beni hatırla</span>
                  </label>
                  <Link href="/sifre-sifirla" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">Şifremi unuttum</Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Giriş yapılıyor...
                    </div>
                  ) : 'Giriş Yap'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  Hesabınız yok mu? <Link href="/uye-ol" className="text-blue-600 hover:underline">Üye Ol</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
