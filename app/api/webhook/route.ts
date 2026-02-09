export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Webhook received:', body);
    
    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
