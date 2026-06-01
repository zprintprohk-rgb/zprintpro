import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test',
  description: 'Test',
};

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>TEST</h1>
    </div>
  );
}
