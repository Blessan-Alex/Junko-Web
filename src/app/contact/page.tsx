import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: { absolute: 'Contact Junko FZE | Quotes & Technical Support' },
  description:
    'Request a machinery quote or technical support. Visit Junko FZE in Hamriyah Free Zone, Sharjah, or contact our sales team — typical reply within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Junko FZE | Quotes & Technical Support',
    description:
      'Request a machinery quote or technical support. Visit Junko FZE in Hamriyah Free Zone, Sharjah, or contact our sales team — typical reply within 24 hours.',
    url: '/contact',
    type: 'website',
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
