import DenemeSınavıClient from './DenemeSınavıClient';

// Static params for build
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' }, // Ücretsiz Türkçe branş
    { id: '12' }, // Ücretsiz Matematik branş
    { id: '13' }  // Ücretsiz Fen branş
  ];
}

export default function DenemeSınavı({ params }) {
  return <DenemeSınavıClient params={params} />;
}