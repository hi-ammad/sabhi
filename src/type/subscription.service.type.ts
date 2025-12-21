export type TPlanName = "ONE" | "GROWTH" | "TRIAL" | "PRO";

export type TUsageType =
  | "messages"
  | "sms"
  | "whatsapp"
  | "facebook"
  | "seats"
  | "phoneNumbers"
  | "paymentLinks";

export type TUsageAction = "add" | "remove";

export interface IPlanLimit {
  seats: number;
  messages: number;
  phoneNumbers: number;
}

export interface IFeatureCheckResult {
  allowed: boolean;
  reason?: string;
  planName?: TPlanName;
}
