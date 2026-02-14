import React from "react";
import { Button } from "./ui/button";

const ContactForm = () => {
  return (
    <div className="bg-card/60 backdrop-blur-xl border rounded-3xl p-8 md:p-10 shadow-xl">
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="First name"
            className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            placeholder="Last name"
            className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <input
          placeholder="Email address"
          type="email"
          className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          placeholder="Subject"
          className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          placeholder="Your message..."
          rows={5}
          className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <Button className="w-full rounded-full py-6 text-base">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
