import { products } from '@/lib/data';
import HeroSection from '@/components/home/HeroSection';
import CategoryRow from '@/components/home/CategoryRow';
import FeaturedSection from '@/components/home/FeaturedSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AboutSection from '@/components/home/AboutSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const menProducts     = products.filter(p => p.category === 'men');
  const womenProducts   = products.filter(p => p.category === 'women');
  const leatherProducts = products.filter(p => p.category === 'leather');
  const minimalProducts = products.filter(p => p.category === 'minimal');
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryRow title="Wallets" subtitle="Men's"   products={menProducts}     category="men"     bgAlt={false} />
      <CategoryRow title="Wallets" subtitle="Women's" products={womenProducts}   category="women"   bgAlt={true}  />
      <CategoryRow title="Wallets" subtitle="Leather" products={leatherProducts} category="leather" bgAlt={false} />
      <CategoryRow title="Wallets" subtitle="Minimal" products={minimalProducts} category="minimal" bgAlt={true}  />
      <FeaturedSection products={featuredProducts} />
      <TestimonialsSection />
      <AboutSection />
      <Footer />
    </>
  );
}
