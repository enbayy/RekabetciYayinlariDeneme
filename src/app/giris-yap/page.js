'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GirisYap() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    // Form validasyonu
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifre alanı zorunludur';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simüle edilmiş giriş işlemi
      setTimeout(function() {
        setIsLoading(false);
        alert('Giriş başarılı!');
        // Burada API çağrısı yapılacak ve kullanıcı yönlendirilecek
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const checked = e.target.checked;
    
    const newFormData = Object.assign({}, formData);
    newFormData[name] = type === 'checkbox' ? checked : value;
    setFormData(newFormData);
    
    // Hata mesajını temizle
    if (errors[name]) {
      const newErrors = Object.assign({}, errors);
      newErrors[name] = '';
      setErrors(newErrors);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 text-gray-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Giriş Yap
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300">
            Hesabınıza giriş yapın ve deneme sınavlarına başlayın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-transparent dark:border-slate-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
              Hesabınıza Giriş Yapın
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                  placeholder="Şifrenizi girin"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
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
                  <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-slate-300">
                    Beni hatırla
                  </label>
                </div>
                <Link
                  href="/sifre-sifirla"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Şifremi unuttum
                </Link>
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
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-300">veya</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-900 text-sm font-medium text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-900 text-sm font-medium text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>

          {/* Benefits & Registration */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-transparent dark:border-slate-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-6">
                Hesabınız Yok mu?
              </h2>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Ücretsiz hesap oluşturun ve tüm deneme sınavlarına erişim sağlayın. 
                Detaylı analizler ve performans takibi ile başarınızı artırın.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-slate-200">Ücretsiz deneme sınavları</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-slate-200">Detaylı performans analizi</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-slate-200">İlerleme takibi</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-slate-200">7/24 teknik destek</span>
                </div>
              </div>

              <Link
                href="/uye-ol"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Ücretsiz Üye Ol
              </Link>
            </div>

            <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-6 border border-transparent dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
                Demo Hesap
              </h3>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                Önce denemek isterseniz demo hesabımızı kullanabilirsiniz.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 mb-4 border border-transparent dark:border-slate-700">
                <p className="text-sm text-gray-600 dark:text-slate-300 mb-1">
                  <strong>E-posta:</strong> demo@denemeplatformu.com
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  <strong>Şifre:</strong> demo123
                </p>
              </div>
              <button
                onClick={function() {
                  const newFormData = Object.assign({}, formData);
                  newFormData.email = 'demo@denemeplatformu.com';
                  newFormData.password = 'demo123';
                  newFormData.rememberMe = false;
                  setFormData(newFormData);
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Demo Bilgilerini Doldur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
