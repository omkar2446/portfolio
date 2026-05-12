import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { Send, Mail, Github, Linkedin, MapPin, Loader2, Briefcase } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
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

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="container-max">
          <SectionTitle 
            centered
            label="Collaboration"
            title="Get In Touch" 
            subtitle="Ready to elevate your digital presence? Let's discuss how technical precision can drive your vision forward."
          />

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="glass-card p-12 md:p-16 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-10">MESSAGE TERMINAL</div>
                
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-8 py-6 rounded-[2rem] bg-secondary/30 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-8 py-6 rounded-[2rem] bg-secondary/30 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Project Details</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your architectural vision..."
                      className="w-full px-8 py-6 rounded-[2.5rem] bg-secondary/30 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold resize-none"
                    />
                  </div>
                  <Button type="submit" className="btn-premium w-full py-10 text-xl font-black uppercase tracking-[0.3em] shimmer shadow-premium" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={24} className="mr-3 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send size={24} className="ml-3" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <div className="space-y-12">
              <AnimatedSection delay={200}>
                <div className="glass-card p-12 md:p-16 border-white/5 relative overflow-hidden h-full flex flex-col">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-10">CONTACT CHANNELS</div>
                  <div className="space-y-10 flex-grow">
                    {[
                      { icon: <Mail size={24} />, label: 'Direct Email', value: 'otambe655@gmail.com', href: 'mailto:otambe655@gmail.com' },
                      { icon: <Briefcase size={24} />, label: 'Professional Availability', value: 'Accepting select Q1 2025 projects', href: '#' },
                      { icon: <MapPin size={24} />, label: 'Global Base', value: 'Maharashtra, India', href: '#' }
                    ].map((item, i) => (
                      <a 
                        key={i} 
                        href={item.href}
                        className="flex items-center gap-8 group cursor-pointer"
                      >
                        <div className="w-16 h-16 rounded-[2rem] bg-secondary flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 shadow-soft">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-foreground/20 mb-2">{item.label}</div>
                          <div className="text-xl font-black group-hover:text-foreground transition-colors">{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-16 pt-10 border-t border-white/5">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-8">SOCIAL ARCHIVES</div>
                    <div className="flex gap-6">
                      {[
                        { icon: <Github size={20} />, link: 'https://github.com/omkar2446' },
                        { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/omkar-tambe-311a72350/' }
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all duration-300 shadow-soft"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
