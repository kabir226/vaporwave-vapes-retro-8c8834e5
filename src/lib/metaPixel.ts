// Utility functions for Meta Pixel tracking
import { supabase } from "@/integrations/supabase/client";

// Hash email using SHA-256
export async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Track Purchase event (client-side + server-side)
export async function trackPurchase(orderData: {
  value: number;
  currency?: string;
  orderId: string;
  email?: string;
}) {
  const purchaseData: any = {
    value: orderData.value,
    currency: orderData.currency || 'EUR',
    content_type: 'product',
  };

  // Use orderId as eventId for deduplication
  const eventId = `purchase_${orderData.orderId}`;
  let hashedEmail: string | undefined;

  // Hash email if available
  if (orderData.email) {
    hashedEmail = await hashEmail(orderData.email);
  }

  console.log('Tracking purchase with eventId:', eventId);

  // Client-side tracking with Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const fbq = (window as any).fbq;
    fbq('track', 'Purchase', purchaseData, {
      eventID: eventId,
      ...(hashedEmail && { em: hashedEmail }),
    });
    console.log('Meta Pixel Purchase (Browser):', { eventId, ...purchaseData });
  }

  // Server-side tracking via Conversions API
  try {
    const response = await supabase.functions.invoke('track-meta-event', {
      body: {
        eventName: 'Purchase',
        eventData: {
          ...purchaseData,
          ...(hashedEmail && { em: hashedEmail }),
        },
        eventId,
        userAgent: navigator.userAgent,
        sourceUrl: window.location.href,
      },
    });
    
    console.log('Meta Conversions API (Server) response:', response);
    
    if (response.error) {
      console.error('Server-side tracking error:', response.error);
    } else {
      console.log('Meta Conversions API (Server) success:', response.data);
    }
  } catch (error) {
    console.error('Failed to send server-side Meta event:', error);
  }
}

// Track AddToCart event
export function trackAddToCart(productData: {
  value: number;
  currency?: string;
  contentName: string;
  contentId: string;
}) {
  if (typeof window === 'undefined' || !(window as any).fbq) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  const fbq = (window as any).fbq;
  fbq('track', 'AddToCart', {
    value: productData.value,
    currency: productData.currency || 'EUR',
    content_name: productData.contentName,
    content_ids: [productData.contentId],
    content_type: 'product',
  });
}

// Track ViewContent event
export function trackViewContent(productData: {
  value: number;
  currency?: string;
  contentName: string;
  contentId: string;
}) {
  if (typeof window === 'undefined' || !(window as any).fbq) {
    console.warn('Meta Pixel not loaded');
    return;
  }

  const fbq = (window as any).fbq;
  fbq('track', 'ViewContent', {
    value: productData.value,
    currency: productData.currency || 'EUR',
    content_name: productData.contentName,
    content_ids: [productData.contentId],
    content_type: 'product',
  });
}
