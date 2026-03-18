import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { mutateAsync, isPending, isSuccess } = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(form);
      toast.success(
        "Your inquiry has been submitted. We will be in touch shortly.",
      );
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-navy tracking-tight">
            Contact Us
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ready to discuss your legal needs? Reach out to our team for a
            professional consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-navy mb-2">
                Office Information
              </h3>
              <div className="h-0.5 w-12 bg-gold mb-6" />
            </div>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "ashutoshsingh0101970@gmail.com",
                href: "mailto:ashutoshsingh0101970@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 95969 91023",
                href: "tel:+919596991023",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Available nationwide & internationally",
                href: undefined,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-navy font-medium mt-0.5 hover:text-gold transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-navy font-medium mt-0.5">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="p-6 rounded-sm"
              style={{ background: "oklch(0.22 0.055 243)" }}
            >
              <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
                Office Hours
              </p>
              <p className="text-white font-semibold">Monday – Friday</p>
              <p className="text-white/70 text-sm">9:00 AM – 6:00 PM (IST)</p>
              <p className="text-white font-semibold mt-2">Saturday</p>
              <p className="text-white/70 text-sm">10:00 AM – 2:00 PM (IST)</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              data-ocid="contact.modal"
              className="space-y-5"
            >
              <div>
                <Label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest font-semibold text-navy"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  data-ocid="contact.input"
                  value={form.name}
                  onChange={update("name")}
                  required
                  placeholder="Your full name"
                  className="mt-1.5 rounded-none border-border focus:border-gold focus:ring-gold"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest font-semibold text-navy"
                >
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="contact.input"
                  value={form.email}
                  onChange={update("email")}
                  required
                  placeholder="your@email.com"
                  className="mt-1.5 rounded-none border-border focus:border-gold focus:ring-gold"
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="text-xs uppercase tracking-widest font-semibold text-navy"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  data-ocid="contact.input"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+91 00000 00000"
                  className="mt-1.5 rounded-none border-border focus:border-gold focus:ring-gold"
                />
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest font-semibold text-navy"
                >
                  Message *
                </Label>
                <Textarea
                  id="message"
                  data-ocid="contact.textarea"
                  value={form.message}
                  onChange={update("message")}
                  required
                  rows={5}
                  placeholder="Describe your legal needs..."
                  className="mt-1.5 rounded-none border-border focus:border-gold focus:ring-gold resize-none"
                />
              </div>

              {isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">
                    Inquiry submitted successfully!
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                data-ocid="contact.submit_button"
                className="w-full bg-navy hover:bg-navy-deep text-white font-bold uppercase tracking-widest text-sm py-3 h-auto rounded-none transition-all duration-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
