import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Junko FZE | Packaging Machine Sales & Support",
  description: "Get a quote or request support. Visit our office in Hamriyah Free Zone, Sharjah, call us, or send an inquiry. We respond typically within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
