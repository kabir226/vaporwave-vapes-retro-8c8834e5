
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  content: string;
  author: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="bg-glass border-primary cyber-border min-h-[300px]">
        <CardContent className="p-8 flex flex-col justify-center text-center">
          <Quote className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
          
          <blockquote className="text-lg md:text-xl font-medium mb-6 text-foreground leading-relaxed">
            "{testimonials[currentIndex].content}"
          </blockquote>
          
          <div className="flex justify-center mb-4">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-retro-gold fill-current" />
            ))}
          </div>
          
          <cite className="text-primary font-semibold">
            {testimonials[currentIndex].author}
          </cite>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevious}
          className="cyber-border"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex gap-2 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-primary animate-pulse' 
                  : 'bg-muted-foreground/50 hover:bg-muted-foreground'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          className="cyber-border"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
