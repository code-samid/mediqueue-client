'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const slides = [
  {
    title: 'Find your perfect tutor',
    subtitle: 'Connect with verified tutors for Mathematics, Physics, English and more',
    cta: 'Browse Tutors',
    href: '/tutors',
    gradient: 'from-indigo-600 via-purple-600 to-cyan-500',
    emoji: '🎓',
  },
  {
    title: 'Book sessions instantly',
    subtitle: 'No more back-and-forth emails — book your session in under 60 seconds',
    cta: 'Get Started',
    href: '/register',
    gradient: 'from-purple-600 via-pink-500 to-orange-400',
    emoji: '⚡',
  },
  {
    title: 'Learn on your schedule',
    subtitle: 'Online or in-person, morning or evening — tutors that fit your life',
    cta: 'View Tutors',
    href: '/tutors',
    gradient: 'from-cyan-500 via-teal-500 to-green-500',
    emoji: '📚',
  },
];

export default function HeroCarousel() {
  const router = useRouter();

  return (
    <div className="rounded-3xl overflow-hidden mb-16">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-80 md:h-96"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center p-10 text-white text-center`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="text-6xl mb-4">{slide.emoji}</div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Button
                  onClick={() => router.push(slide.href)}
                  className="bg-white text-indigo-600 hover:bg-white/90 font-bold px-8 py-3 rounded-xl h-auto"
                >
                  {slide.cta} <ArrowRight size={16} className="ml-1" />
                </Button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}