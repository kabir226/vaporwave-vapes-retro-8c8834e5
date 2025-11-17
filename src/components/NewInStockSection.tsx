import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
const NewInStockSection: React.FC = () => {
  const {
    getSetting
  } = useHomepageSettings('new_in_stock');
  const settings = getSetting('new_in_stock');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const products = settings?.settings?.products || [{
    image_url: '',
    name: 'Pablo Blueberry Peach Ice - 50mg',
    price: '£4.99 GBP'
  }, {
    image_url: '',
    name: 'Pablo Blueberry Peach Ice - 50mg',
    price: '£4.99 GBP'
  }, {
    image_url: '',
    name: 'Pablo Blueberry Peach Ice - 50mg',
    price: '£4.99 GBP'
  }];
  return <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {settings?.title || 'NOUVEAUTÉS EN STOCK'}
        </h2>

        <Carousel setApi={setApi} className="w-full max-w-md mx-auto">
          <CarouselContent>
            {products.map((product: any, index: number) => <CarouselItem key={index}>
                <Link to="/shop" className="block">
                  <div className="relative cursor-pointer">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-muted rounded-2xl overflow-hidden w-full aspect-square flex items-center justify-center">
                        {product.image_url ? <img src={product.image_url} alt={product.name || 'Nouveau produit'} className="w-full h-full object-cover" /> : <div className="text-center p-8">
                            <p className="text-lg text-muted-foreground mb-4">Image du produit</p>
                            <p className="text-sm text-muted-foreground">{product.name}</p>
                          </div>}
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>)}
          </CarouselContent>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => api?.scrollPrev()}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <span className="text-sm font-medium">{current}/{products.length}</span>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => api?.scrollNext()}>
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </Carousel>
      </div>
    </section>;
};
export default NewInStockSection;