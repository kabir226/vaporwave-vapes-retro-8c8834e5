import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { eventName, eventData, eventId, userAgent, sourceUrl } = await req.json();

    const PIXEL_ID = '1330195604984959';
    const ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');

    if (!ACCESS_TOKEN) {
      console.error('META_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Meta access token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Received event:', { eventName, eventId, eventData });

    // Prepare the payload for Meta Conversions API
    const payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: sourceUrl,
        user_data: {
          client_user_agent: userAgent,
          ...(eventData.em && { em: eventData.em }),
        },
        custom_data: {
          currency: eventData.currency || 'EUR',
          value: eventData.value,
          ...(eventData.content_name && { content_name: eventData.content_name }),
          ...(eventData.content_ids && { content_ids: eventData.content_ids }),
          ...(eventData.content_type && { content_type: eventData.content_type }),
        },
      }],
    };

    console.log('Sending to Meta API:', JSON.stringify(payload, null, 2));

    // Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await metaResponse.json();
    console.log('Meta API response:', result);

    if (!metaResponse.ok) {
      console.error('Meta API error:', result);
      return new Response(
        JSON.stringify({ error: 'Failed to track event', details: result }),
        { status: metaResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Meta event tracked successfully:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in track-meta-event function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
