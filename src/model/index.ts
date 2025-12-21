import { model } from "mongoose";
import { EModalNames } from "@/enum";

import {
  a2pEndUserSchema,
  addressSchema,
  brandSchema,
  businessAdminSchema,
  businessSchema,
  businessSubscriptionSchema,
  businessTemplateSchema,
  businessUsageSchema,
  callHistorySchema,
  clerkDailyCountSchema,
  clerkMonthlyCountSchema,
  clerkWeeklyCountSchema,
  conversationSchema,
  customerProfileSchema,
  customerSchema,
  endUserSchema,
  entityAssignmentSchema,
  messageLogSchema,
  messagingServiceSchema,
  paymentLinkSchema,
  phoneNumberAssignmentSchema,
  profileEvaluationSchema,
  refreshTokenSchema,
  salesClerkCustomerSchema,
  salesClerkSchema,
  slimcdBusinessDetailsSchema,
  subscriptionUsageSchema,
  superAdminSchema,
  supportingDocumentSchema,
  trustProductSchema,
  user2FASchema,
  userSchema,
} from "@/schema";

/* ============================================================
   MODELS
============================================================ */

/* Core */
export const User = model(EModalNames.USER, userSchema);
export const SalesClerk = model(EModalNames.SALES_CLERK, salesClerkSchema);
export const Customer = model(EModalNames.CUSTOMER, customerSchema);
export const Business = model(EModalNames.BUSINESS, businessSchema);
export const BusinessAdmin = model(EModalNames.BUSINESS_ADMIN, businessAdminSchema);
export const SuperAdmin = model(EModalNames.SUPER_ADMIN, superAdminSchema);

/* Counts */
export const ClerkDailyCount = model(EModalNames.CLERK_DAILY_COUNT, clerkDailyCountSchema);
export const ClerkWeeklyCount = model(EModalNames.CLERK_WEEKLY_COUNT, clerkWeeklyCountSchema);
export const ClerkMonthlyCount = model(EModalNames.CLERK_MONTHLY_COUNT, clerkMonthlyCountSchema);

/* Business */
export const Brand = model(EModalNames.BRAND, brandSchema);
export const Address = model(EModalNames.ADDRESS, addressSchema);
export const BusinessSubscription = model(EModalNames.BUSINESS_SUBSCRIPTION, businessSubscriptionSchema);
export const BusinessTemplate = model(EModalNames.BUSINESS_TEMPLATE, businessTemplateSchema);
export const BusinessUsage = model(EModalNames.BUSINESS_USAGE, businessUsageSchema);
export const SlimcdBusinessDetails = model(EModalNames.SLIMCD_BUSINESS_DETAILS, slimcdBusinessDetailsSchema);

/* Messaging */
export const Conversation = model(EModalNames.CONVERSATION, conversationSchema);
export const MessageLog = model(EModalNames.MESSAGE_LOG, messageLogSchema);
export const MessagingService = model(EModalNames.MESSAGING_SERVICE, messagingServiceSchema);
export const CallHistory = model(EModalNames.CALL_HISTORY, callHistorySchema);
// export const Campaign = model(EModalNames.CAMPAIGN, campaignSchema);

/* Compliance */
// export const ComplianceMetrics = model(EModalNames.COMPLIANCE_METRICS, complianceMetricsSchema);
// export const ComplianceStatus = model(EModalNames.COMPLIANCE_STATUS, complianceStatusSchema);
export const TrustProduct = model(EModalNames.TRUST_PRODUCT, trustProductSchema);
export const SupportingDocument = model(EModalNames.SUPPORTING_DOCUMENT, supportingDocumentSchema);

/* Relations */
export const CustomerProfile = model(EModalNames.CUSTOMER_PROFILE, customerProfileSchema);
export const EndUser = model(EModalNames.END_USER, endUserSchema);
export const A2PEndUser = model(EModalNames.A2P_END_USER, a2pEndUserSchema);
export const EntityAssignment = model(EModalNames.ENTITY_ASSIGNMENT, entityAssignmentSchema);
export const SalesClerkCustomer = model(EModalNames.SALES_CLERK_CUSTOMER, salesClerkCustomerSchema);

/* Subscription */
export const SubscriptionUsage = model(EModalNames.SUBSCRIPTION_USAGE, subscriptionUsageSchema);
export const PaymentLink = model(EModalNames.PAYMENT_LINK, paymentLinkSchema);

/* Security */
export const RefreshToken = model(EModalNames.REFRESH_TOKEN, refreshTokenSchema);
export const User2FA = model(EModalNames.USER_2FA, user2FASchema);
