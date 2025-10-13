'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        addToast("E-posta doğrulamanız tamamlanmamış. Doğrulama e-postası gönderildi.", "error");
        setIsLoading(false);
        return;
      }

      addToast("Giriş başarılı!", "success");
      router.push('/');

    } catch (err) {
      console.error('Login error:', err);

      // Firebase hatalarına göre mesaj
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 text-gray-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Giriş Yap</h1>
          <p className="text-xl text-gray-600 dark:text-slate-300">Hesabınıza giriş yapın ve deneme sınavlarına başlayın</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-transparent dark:border-slate-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-6">Hesabınıza Giriş Yapın</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                  placeholder="ornek@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Şifre</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                  placeholder="Şifrenizi girin"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-slate-300">Beni hatırla</label>
                </div>
                <Link href="/sifre-sifirla" className="text-sm text-blue-600 hover:underline">Şifremi unuttum</Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
              <p className="text-gray-600 dark:text-slate-300">Hesabınız yok mu? <Link href="/uye-ol" className="text-blue-600 hover:underline">Üye Ol</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
