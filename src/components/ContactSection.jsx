import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);

    try {
      // ✅ Trim to avoid hidden spaces in .env
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "Missing EmailJS env vars. Check VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY"
        );
      }

      // ✅ Correct signature (v4+)
      await emailjs.sendForm(serviceId, templateId, form.current, {
        publicKey,
      });

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I’ll get back to you soon.",
      });

      form.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);

      toast({
        title: "Failed to send message",
        // ✅ show the real reason if EmailJS returns it
        description:
          err?.text ||
          err?.message ||
          "Email service rejected the request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:kwasiasomani85@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    kwasiasomani85@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a
                    href="tel:+16193278075"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (619) 327-8075
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground">San Diego, CA</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/kwasi-asomani-61574920b/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin
                    size={32}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  />
                </a>
                <a
                  href="https://github.com/kwasiasomani"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github
                    size={32}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Kwasi Asomani..."
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="reply_to"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
