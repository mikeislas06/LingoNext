import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get("Stripe-Signature") as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;

		if (!session?.metadata?.userId) {
			return new NextResponse("User ID is missing in session metadata", { status: 400 });
		}

		if (!session.subscription) {
			return new NextResponse("Subscription missing in session", { status: 400 });
		}

		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

		const item = subscription.items.data[0];
		await db.insert(userSubscription).values({
			userId: session.metadata.userId,
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			stripePriceId: item.price.id,
			stripeCurrentPeriodEnd: new Date(item.current_period_end * 1000),
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		const invoice = event.data.object as Stripe.Invoice;

		const subscriptionRef = invoice.parent?.subscription_details?.subscription;
		if (!subscriptionRef) {
			return new NextResponse("Subscription missing in invoice", { status: 400 });
		}

		const subscriptionId =
			typeof subscriptionRef === "string" ? subscriptionRef : subscriptionRef.id;
		const subscription = await stripe.subscriptions.retrieve(subscriptionId);

		const item = subscription.items.data[0];
		await db
			.update(userSubscription)
			.set({
				stripePriceId: item.price.id,
				stripeCurrentPeriodEnd: new Date(item.current_period_end * 1000),
			})
			.where(eq(userSubscription.stripeSubscriptionId, subscription.id));
	}

	return new NextResponse(null, { status: 200 });
}
