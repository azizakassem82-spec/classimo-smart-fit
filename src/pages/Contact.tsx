import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const { language, t } = useLanguage();

  const whatsappNumber = '213795443714';
  const email = 'ganiislam452@gmail.com';
  const googleMapsUrl = 'https://maps.app.goo.gl/X89Pz6CaDge3TKNq6';
  const googleMapsEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.8893!2d3.0588!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzEzLjciTiAzwrAwMyczNS4yIkU!5e0!3m2!1sen!2sdz!4v1234567890';

  const contactInfo = [
    {
      icon: Phone,
      titleFr: 'Téléphone',
      titleAr: 'الهاتف',
      value: '+213 795 44 37 14',
      href: `tel:+${whatsappNumber}`,
    },
    {
      icon: MessageCircle,
      titleFr: 'WhatsApp',
      titleAr: 'واتساب',
      value: '+213 795 44 37 14',
      href: `https://wa.me/${whatsappNumber}`,
    },
    {
      icon: Mail,
      titleFr: 'Email',
      titleAr: 'البريد الإلكتروني',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      titleFr: 'Adresse',
      titleAr: 'العنوان',
      value: language === 'ar' ? 'الجزائر' : 'Algérie',
      href: googleMapsUrl,
    },
    {
      icon: Clock,
      titleFr: 'Horaires',
      titleAr: 'أوقات العمل',
      value: language === 'ar' ? '9:00 - 21:00' : '9h00 - 21h00',
      href: null,
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>{language === 'ar' ? 'اتصل بنا | كلاسيمو' : 'Contact | Classimo'}</title>
        <meta 
          name="description" 
          content={language === 'ar' 
            ? 'تواصل معنا لحجز بدلتك الأنيقة. واتساب، هاتف، بريد إلكتروني.'
            : 'Contactez-nous pour réserver votre costume élégant. WhatsApp, téléphone, email.'
          } 
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <AnimatedSection className="text-center mb-12">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                {language === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {language === 'ar' 
                  ? 'نحن هنا لمساعدتك. تواصل معنا عبر أي من الطرق التالية.'
                  : 'Nous sommes là pour vous aider. Contactez-nous via l\'un des moyens suivants.'
                }
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Info Cards */}
              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300"
                    >
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <info.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar' ? info.titleAr : info.titleFr}
                            </p>
                            <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <info.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar' ? info.titleAr : info.titleFr}
                            </p>
                            <p className="text-foreground font-medium">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* WhatsApp CTA */}
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full mt-6"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {language === 'ar' ? 'تواصل عبر واتساب' : 'Contacter via WhatsApp'}
                    </a>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Google Maps */}
              <AnimatedSection delay={0.2}>
                <div className="glass-card rounded-xl overflow-hidden h-full min-h-[400px]">
                  <iframe
                    src={googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={language === 'ar' ? 'موقعنا على الخريطة' : 'Notre emplacement'}
                    className="w-full h-full"
                  />
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-4 text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  {language === 'ar' ? 'فتح في خرائط جوجل' : 'Ouvrir dans Google Maps'}
                </a>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Contact;
