import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { BirthdayWish } from '@/components/BirthdayWish'
import { MessagesList } from '@/components/MessagesList'
import { Footer } from '@/components/Footer'
import { FloatingElements } from '@/components/FloatingElements'
import { SparkleAnimation } from '@/components/SparkleAnimation'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Scroll3DScene } from '@/components/Scroll3DScene'
import { ParallaxLayers } from '@/components/ParallaxLayers'
import { ScrollAnimation, BatchScrollAnimation, ParallaxText } from '@/components/ScrollAnimations'
import { useLenis } from '@/hooks/useLenis'

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <div className="relative">
      {/* Main Content with Parallax Layers */}
      <div className="relative z-10">
        <ParallaxLayers>
          <Header />
          
          <main className="relative">
            {/* Hero Section with enhanced animations */}
            <ScrollAnimation animationType="fadeUp" duration={1.2}>
              <div className="min-h-screen bg-background/80 backdrop-blur-sm">
                <Hero />
              </div>
            </ScrollAnimation>
            
            {/* 3D Scene Spacer for scroll trigger */}
            <Scroll3DScene />
            
            {/* Birthday Wish Section */}
            <ScrollAnimation animationType="scale" delay={0.2}>
              <div className="min-h-screen bg-background/80 backdrop-blur-sm">
                <BirthdayWish />
              </div>
            </ScrollAnimation>
            
            
            {/* Messages List */}
            <ScrollAnimation animationType="slideLeft" duration={1}>
              <div className="bg-background/85 backdrop-blur-sm">
                <MessagesList />
              </div>
            </ScrollAnimation>
            
          </main>
          
          <Footer />
        </ParallaxLayers>
        
        {/* Floating elements with reduced opacity for 3D effect */}
        <div className="opacity-60">
          <FloatingElements />
          <SparkleAnimation />
        </div>
        
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Index;
