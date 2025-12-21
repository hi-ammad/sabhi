import { BusinessSubscription, SubscriptionUsage } from "@/model";
import type { IPlanLimit, TPlanName, TUsageType, TUsageAction, IFeatureCheckResult } from "@/type";
import {
  MESSAGE_LIMIT_REACHED,
  SEATS_LIMIT_REACHED,
  PHONE_LIMIT_REACHED,
  DONT_HAVE_ACTIVE_SUBSCRIPTION,
} from "@/utils/constants/error.constants";

/* ----------------------------- Types ----------------------------- */


/* ------------------------ Service Class --------------------------- */

class SubscriptionService {
  private readonly planLimits: Record<TPlanName, IPlanLimit> = {
    ONE: { seats: 2, messages: 1000, phoneNumbers: 1 },
    GROWTH: { seats: 4, messages: 2000, phoneNumbers: 1 },
    TRIAL: { seats: 1, messages: 250, phoneNumbers: 1 },
    PRO: { seats: Infinity, messages: Infinity, phoneNumbers: Infinity },
  };

  /* ---------------------- Core Helpers ---------------------- */

  private async getPlanAndUsage(businessId: string) {
    const businessSubscription = await BusinessSubscription.findOne({
      business: businessId,
      status: "Active",
    });

    if (!businessSubscription) {
      throw new Error(DONT_HAVE_ACTIVE_SUBSCRIPTION);
    }

    const { planName, _id: subscriptionId, isTrial, user } =
      businessSubscription;

    const usage = await SubscriptionUsage.findOne({
      user,
      subscription: subscriptionId,
    });

    if (!usage) {
      throw new Error("Subscription usage not found");
    }

    return {
      planName: planName as TPlanName,
      usage,
      isTrial,
    };
  }

  /* -------------------- Feature Validation -------------------- */

  async checkFeatureLimit(
    businessId: string,
    feature: TUsageType | "all" = "all"
  ): Promise<IFeatureCheckResult> {
    const { planName, usage, isTrial } =
      await this.getPlanAndUsage(businessId);

    const plan = this.planLimits[isTrial ? "TRIAL" : planName];

    /* ONE plan channel restrictions */
    if (
      planName === "ONE" &&
      ["whatsapp", "facebook"].includes(feature)
    ) {
      return {
        allowed: false,
        reason: `Your plan does not support ${feature}. Please upgrade.`,
      };
    }

    const totalMessages =
      usage.messages +
      usage.sms +
      usage.whatsapp +
      usage.facebook;

    if (feature === "all") {
      if (plan.messages !== Infinity && totalMessages >= plan.messages) {
        return { allowed: false, reason: MESSAGE_LIMIT_REACHED };
      }

      if (plan.seats !== Infinity && usage.seats >= plan.seats) {
        return { allowed: false, reason: SEATS_LIMIT_REACHED };
      }

      if (
        plan.phoneNumbers !== Infinity &&
        usage.phoneNumbers > plan.phoneNumbers
      ) {
        return { allowed: false, reason: PHONE_LIMIT_REACHED };
      }

      return { allowed: true, planName };
    }

    switch (feature) {
      case "messages":
      case "sms":
      case "whatsapp":
      case "facebook":
        if (plan.messages !== Infinity && totalMessages >= plan.messages) {
          return { allowed: false, reason: MESSAGE_LIMIT_REACHED };
        }
        break;

      case "seats":
        if (plan.seats !== Infinity && usage.seats >= plan.seats) {
          return { allowed: false, reason: SEATS_LIMIT_REACHED };
        }
        break;

      case "phoneNumbers":
        if (
          plan.phoneNumbers !== Infinity &&
          usage.phoneNumbers > plan.phoneNumbers
        ) {
          return { allowed: false, reason: PHONE_LIMIT_REACHED };
        }
        break;
    }

    return { allowed: true, planName };
  }

  /* ---------------- Convenience Wrappers ---------------- */

  checkMessagingLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "messages");
  }

  checkWhatsAppLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "whatsapp");
  }

  checkFacebookLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "facebook");
  }

  checkSeatsLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "seats");
  }

  checkPhoneNumberLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "phoneNumbers");
  }

  checkSmsLimit(businessId: string) {
    return this.checkFeatureLimit(businessId, "sms");
  }

  /* ------------------ Usage Updates ------------------ */

  async updateSubscriptionUsage(
    businessId: string,
    usageType: TUsageType,
    action: TUsageAction = "add",
    count = 1
  ) {
    const allowedTypes: TUsageType[] = [
      "messages",
      "sms",
      "whatsapp",
      "facebook",
      "seats",
      "phoneNumbers",
      "paymentLinks",
    ];

    if (!allowedTypes.includes(usageType)) {
      return { updated: false, reason: "Unsupported usage type" };
    }

    const isRemove = action === "remove";

    const subscription = await BusinessSubscription.findOne({
      business: businessId,
      status: "Active",
    });

    if (!subscription) {
      return { updated: false, reason: "Subscription not found" };
    }

    const usage = await SubscriptionUsage.findOne({
      user: subscription.user,
      subscription: subscription._id,
    });

    if (!usage) {
      return { updated: false, reason: "Usage not found" };
    }

    const current = Number(usage[usageType] ?? 0);
    const delta = isRemove ? -count : count;
    usage[usageType] = Math.max(0, current + delta);

    await usage.save();

    return {
      updated: true,
      action,
      value: usage[usageType],
    };
  }

  /* ------------------ Read-only Helper ------------------ */

  async getSubscriptionData(filter: Record<string, unknown>) {
    const sub = await BusinessSubscription.findOne(filter);

    if (!sub) return null;

    return {
      planName: sub.planName,
      businessId: sub.business,
      isTrial: sub.isTrial,
      status: sub.status,
      startDate: sub.subscriptionStart,
      endDate: sub.subscriptionEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      canceledAt: sub.canceledAt,
      schedulePlanName: sub.schedulePlanName,
      scheduledChangeAt: sub.scheduledChangeAt,
    };
  }
}

export const subscriptionService = new SubscriptionService();
