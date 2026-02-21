import PageHeader from "@/components/page-header";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" />

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT — INFO */}
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold tracking-tight">
              Let’s talk
            </h2>

            <p className="text-muted-foreground max-w-md leading-relaxed">
              Have questions about products, orders, or partnerships? Our team
              is here to help. Reach out and we’ll respond within 24 hours.
            </p>

            <div className="space-y-6 pt-4">
              {/* email */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">
                    support@shoppies.com
                  </p>
                </div>
              </div>

              {/* phone */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground text-sm">
                    +91 98XX5 XXX10
                  </p>
                </div>
              </div>

              {/* office */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-muted-foreground text-sm">
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="mb-20">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
