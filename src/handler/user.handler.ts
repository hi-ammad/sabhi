import { User, SalesClerk, Customer, BusinessAdmin, SuperAdmin } from "@/model";
// import SubscriptionService from "@/services/SubscriptionService/subscriptionService";
import { createOne, updateOne, deleteOne, getOne, getAll } from "./handler.factory.ts";
import { createUserJoiSchema } from "@/validation/user.joi.ts";

export const createUser = createOne(User, {
  schema: createUserJoiSchema,
  createFn: async ({ req }) => {
    // Mongoose schema handles unique constraints on email/phoneNumber
    const user = await User.create(req.body);
    // Role-specific post creation
    if (user.role === "sales_clerk") {
      await SalesClerk.create({ user: user.id, business: req.body.business, status: req.body.status });
      // await SubscriptionService.updateSubscriptionUsage(req.body.businessId, "seats");
    }
    if (user.role === "customer") {
      await Customer.create({ user: user.id, business: req.body.business, status: req.body.status, assignedSalesClerk: req.body.assignedClerkId });
    }
    if (user.role === "business_admin") {
      await BusinessAdmin.create({ user: user.id, business: req.body.business, status: req.body.status });
    }
    if (user.role === "super_admin") {
      await SuperAdmin.create({ user: user.id, status: req.body.status });
    }

    return user;
  },
});

/** ---------------- UPDATE, DELETE, GET ---------------- */
// export const updateUser = updateOne(User, { schema: updateUserSchema });
export const deleteUser = deleteOne(User);
export const getUser = getOne(User);
export const getUsers = getAll(User);
