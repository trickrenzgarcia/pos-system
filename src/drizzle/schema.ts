import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  real,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const product = pgTable("product", {
  id: uuid("id").notNull().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  price: real("price").notNull().default(0.0),
  stock: integer("stock").notNull().default(0),
  category: text("category").notNull(),
  image: text("image"),
  created_at: timestamp("created_at", { mode: "date" }).notNull(),
});

export const categories = pgTable("category", {
  id: uuid("id").notNull().primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().unique(),
  icon: text("icon").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).notNull(),
});

export const auditLog = pgTable("audit_log", {
  id: uuid("id").notNull().primaryKey(),
  user_id: text("user_id").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entity_id: text("entity_id").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).notNull(),
});

export const rolesEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  empId: text("empId"),
  role: rolesEnum("user").default("user").notNull(),
});



export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);