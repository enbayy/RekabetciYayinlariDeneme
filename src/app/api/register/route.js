import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, phone, school, grade, agreeTerms } = await req.json();

    if (!firstName || !lastName || !email || !password || !agreeTerms) {
      return new Response(JSON.stringify({ message: 'Zorunlu alanlar eksik' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Bu e-posta zaten kayıtlı' }), { status: 400 });
    }

    const newUser = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      school,
      grade,
      agreeTerms,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ message: 'Kullanıcı başarıyla oluşturuldu', userId: newUser.insertedId }), { status: 201 });

  } catch (error) {
    console.error('Register API error:', error);
    return new Response(JSON.stringify({ message: 'Sunucu hatası', error: error.message }), { status: 500 });
  }
}
