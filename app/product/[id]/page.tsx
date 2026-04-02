import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  return products.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — VELLUM`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === Number(id));
  if (!product) notFound();

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <div style={{ paddingTop: '6rem' }}>
        <ProductDetailClient product={product} related={related} />
      </div>
      <Footer />
    </>
  );
}
