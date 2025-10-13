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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Üye Ol</h2>

        <input type="text" name="firstName" placeholder="Ad" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        <input type="text" name="lastName" placeholder="Soyad" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        <input type="email" name="email" placeholder="E-posta" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input type="password" name="password" placeholder="Şifre" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Şifre Tekrar" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        {/* Ek bilgiler */}
        <input type="text" name="phone" placeholder="Telefon (opsiyonel)" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        <input type="text" name="school" placeholder="Okul (opsiyonel)" value={formData.school} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        <input type="text" name="grade" placeholder="Kaçıncı sınıf? (opsiyonel)" value={formData.grade} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="w-4 h-4" />
          <span className="text-gray-700 dark:text-slate-300">Kullanım şartlarını kabul ediyorum</span>
        </label>
        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-blue-400">
          {isLoading ? 'Yükleniyor...' : 'Üye Ol'}
        </button>

        <p className="text-sm text-gray-600 dark:text-slate-300">
          Zaten hesabınız var mı? <Link href="/giris-yap" className="text-blue-600">Giriş Yap</Link>
        </p>
      </form>
    </div>
  );
}
