'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    grade: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.push('/giris-yap');
        return;
      }

      try {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (err) {
        console.error('Firestore fetch error:', err);
        addToast('Kullanıcı verileri alınırken hata oluştu.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Toast fonksiyonu
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setSaving(true);
    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await setDoc(userDoc, userData, { merge: true });
      addToast('Bilgileriniz başarıyla kaydedildi.', 'success');
    } catch (err) {
      console.error('Firestore save error:', err);
      addToast('Kaydetme sırasında hata oluştu.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 py-8 text-neutral-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Profil Bilgilerim</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Soyad</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefon</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Okul</label>
            <input
              type="text"
              name="school"
              value={userData.school}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sınıf</label>
            <input
              type="text"
              name="grade"
              value={userData.grade}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      {/* Toast Bildirimleri */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-md text-white transition-all duration-300 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } animate-fadeIn`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}
