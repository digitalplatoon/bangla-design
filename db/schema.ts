import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, varchar, decimal, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'super_admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'inactive', 'suspended', 'pending']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'cancelled', 'expired', 'past_due', 'trialing']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed', 'refunded', 'cancelled']);
export const paymentProviderEnum = pgEnum('payment_provider', ['bkash', 'nagad', 'sslcommerz', 'stripe']);
export const siteStatusEnum = pgEnum('site_status', ['draft', 'published', 'archived']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  image: text('image'),
  role: userRoleEnum('role').default('user').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  phone: varchar('phone', { length: 20 }),
  locale: varchar('locale', { length: 10 }).default('bn'),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Plans table
export const plans = pgTable('plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  nameBn: varchar('name_bn', { length: 100 }),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  description: text('description'),
  descriptionBn: text('description_bn'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('BDT').notNull(),
  interval: varchar('interval', { length: 20 }).default('monthly').notNull(),
  features: jsonb('features').$type<string[]>().default([]),
  featuresBn: jsonb('features_bn').$type<string[]>().default([]),
  maxSites: integer('max_sites').default(1).notNull(),
  maxPages: integer('max_pages').default(5).notNull(),
  maxStorage: integer('max_storage').default(100).notNull(),
  maxBandwidth: integer('max_bandwidth').default(1000).notNull(),
  aiGenerations: integer('ai_generations').default(10).notNull(),
  customDomain: boolean('custom_domain').default(false).notNull(),
  removeWatermark: boolean('remove_watermark').default(false).notNull(),
  prioritySupport: boolean('priority_support').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  planId: uuid('plan_id').references(() => plans.id).notNull(),
  status: subscriptionStatusEnum('status').default('active').notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelledAt: timestamp('cancelled_at'),
  cancelReason: text('cancel_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Payments table
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('BDT').notNull(),
  provider: paymentProviderEnum('provider').notNull(),
  providerPaymentId: text('provider_payment_id'),
  status: paymentStatusEnum('status').default('pending').notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sites table
export const sites = pgTable('sites', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  domain: varchar('domain', { length: 255 }),
  customDomain: varchar('custom_domain', { length: 255 }),
  templateId: uuid('template_id'),
  status: siteStatusEnum('status').default('draft').notNull(),
  settings: jsonb('settings').$type<Record<string, unknown>>().default({}),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Pages table
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  siteId: uuid('site_id').references(() => sites.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  content: jsonb('content').$type<Record<string, unknown>>().default({}),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  isHomepage: boolean('is_homepage').default(false).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Templates table
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  nameBn: varchar('name_bn', { length: 255 }),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  descriptionBn: text('description_bn'),
  category: varchar('category', { length: 100 }).notNull(),
  thumbnail: text('thumbnail'),
  previewUrl: text('preview_url'),
  content: jsonb('content').$type<Record<string, unknown>>().default({}),
  isPremium: boolean('is_premium').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  usageCount: integer('usage_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// AI Generations table
export const aiGenerations = pgTable('ai_generations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  siteId: uuid('site_id').references(() => sites.id, { onDelete: 'set null' }),
  type: varchar('type', { length: 50 }).notNull(),
  prompt: text('prompt').notNull(),
  result: jsonb('result').$type<Record<string, unknown>>().default({}),
  tokensUsed: integer('tokens_used').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  subscriptions: many(subscriptions),
  payments: many(payments),
  sites: many(sites),
  aiGenerations: many(aiGenerations),
}));

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
  plan: one(plans, { fields: [subscriptions.planId], references: [plans.id] }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, { fields: [payments.userId], references: [users.id] }),
  subscription: one(subscriptions, { fields: [payments.subscriptionId], references: [subscriptions.id] }),
}));

export const sitesRelations = relations(sites, ({ one, many }) => ({
  user: one(users, { fields: [sites.userId], references: [users.id] }),
  pages: many(pages),
  template: one(templates, { fields: [sites.templateId], references: [templates.id] }),
}));

export const pagesRelations = relations(pages, ({ one }) => ({
  site: one(sites, { fields: [pages.siteId], references: [sites.id] }),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  sites: many(sites),
}));

export const aiGenerationsRelations = relations(aiGenerations, ({ one }) => ({
  user: one(users, { fields: [aiGenerations.userId], references: [users.id] }),
  site: one(sites, { fields: [aiGenerations.siteId], references: [sites.id] }),
}));
