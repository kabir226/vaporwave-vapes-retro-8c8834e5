// Utility functions for Meta Pixel tracking
import { supabase } from "@/integrations/supabase/client";

// Generate unique event ID for deduplication
const generateEventId = () => crypto.randomUUID();

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

// Send event to server-side (Conversions API)
async function sendServerEvent(
  eventName: string, 
  eventId: string, 
  eventData: any, 
  userData: any
) {
  try {
    const response = await supabase.functions.invoke('track-meta-event', {
      body: { 
        eventName, 
        eventId, 
        eventData,
        userData,
        userAgent: navigator.userAgent,
        sourceUrl: window.location.href
      }
    });
    
    console.log('Server-side tracking response:', response);
    
    if (response.error) {
      console.error('Server-side tracking error:', response.error);
    }
  } catch (e) {
    console.error('Erreur CAPI:', e);
  }
}

// Track Purchase event (client-side + server-side)
export async function trackPurchase(orderData: {
  value: number;
  currency?: string;
  orderId: string;
  email?: string;
}) {
  // 1. Generate unique event ID for deduplication
  const eventId = generateEventId();
  
  // 2. Prepare event data
  const purchaseData: any = {
    value: orderData.value,
    currency: orderData.currency || 'EUR',
    content_type: 'product',
  };

  console.log('Tracking purchase with eventId:', eventId);

  // Hash email if available
  let hashedEmail: string | undefined;
  if (orderData.email) {
    hashedEmail = await hashEmail(orderData.email);
  }

  // 3. Client-side tracking with Meta Pixel (Browser)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    const fbq = (window as any).fbq;
    fbq('track', 'Purchase', purchaseData, {
      eventID: eventId, // Note: eventID with capital ID for Facebook
      ...(hashedEmail && { em: hashedEmail }),
    });
    console.log('Meta Pixel Purchase (Browser):', { eventID: eventId, ...purchaseData });
  }

  // 4. Server-side tracking via Conversions API
  await sendServerEvent(
    'Purchase',
    eventId,
    purchaseData,
    {
      ...(hashedEmail && { em: hashedEmail }),
    }
  );
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
