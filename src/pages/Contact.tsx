import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { Send, Mail, Github, Linkedin, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        });

      if (error) throw error;

      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'otambe655@gmail.com',
      href: 'otambe655@gmail.com',
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: 'github.com/omkar2446',
      href: 'https://github.com/omkar2446',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/omkar-tambe-311a72350',
      href: 'https://linkedin.com/in/omkar-tambe-311a72350',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="Contact Me" 
            subtitle="Let's connect and discuss your ideas"
            className="text-white drop-shadow-lg"
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 drop-shadow-lg">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-white mb-2 drop-shadow-md"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-white mb-2 drop-shadow-md"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-white mb-2 drop-shadow-md"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <Button type="submit" variant="hero" size="lg" className="w-full backdrop-blur-sm bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl transition-all duration-300" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-xl font-bold text-white mb-6 drop-shadow-lg">
                    Get in Touch
                  </h3>
                  <p className="text-gray-100 mb-8 drop-shadow-md">
                    Feel free to reach out for collaborations, project inquiries, 
                    or just a friendly chat about tech and innovation.
                  </p>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info) => (
                      <a
                        key={info.label}
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group shadow-lg hover:shadow-xl"
                      >
                        <div className="p-3 rounded-xl backdrop-blur-sm bg-white/10 text-white group-hover:scale-110 transition-transform border border-white/20">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-200 drop-shadow-sm">{info.label}</p>
                          <p className="font-medium text-white group-hover:text-white transition-colors drop-shadow-md">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Location Card */}
                <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl backdrop-blur-sm bg-white/10 text-white border border-white/20">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200 drop-shadow-sm">Location</p>
                      <p className="font-medium text-white drop-shadow-md">India</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
