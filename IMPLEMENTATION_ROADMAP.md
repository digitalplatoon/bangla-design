# FEATURE GAP IMPLEMENTATION GUIDE

## Quick Reference

| Feature | Priority | Effort | Blocker | Timeline |
|---------|----------|--------|---------|----------|
| Site Builder UI | CRITICAL | 3-4 wks | YES | Week 1-4 |
| Payment Integration | CRITICAL | 4 wks | YES | Week 5-8 |
| Template APIs | HIGH | 1 wk | NO | Week 5 |
| Site Publication | HIGH | 3 wks | NO | Week 6-8 |
| Email System | HIGH | 2 wks | NO | Week 8-9 |
| Admin Dashboard | MEDIUM | 3-4 wks | NO | Week 10+ |
| Real AI Integration | MEDIUM | 2 wks | NO | Week 11-12 |
| Analytics | MEDIUM | 2-3 wks | NO | Week 13-15 |
| Account Management | MEDIUM | 1 wk | NO | Week 5 |
| SEO Features | MEDIUM | 1-2 wks | NO | Week 16+ |

---

## GAP 1: SITE BUILDER UI (CRITICAL - Blocks Core Feature)

**Current State:** Route exists at `/dashboard/builder` but component is placeholder
**Required For:** Users to actually build websites

### What Needs to Be Built

```
Visual Site Builder Interface
├── Canvas Area (center)
│   ├── Drag-and-drop component placement
│   ├── Real-time preview
│   ├── Responsive breakpoint preview (mobile/tablet/desktop)
│   └── Undo/Redo stack
├── Component Sidebar (left)
│   ├── Component library (buttons, cards, sections, etc.)
│   ├── Search/filter components
│   ├── Drag-to-canvas
│   └── Component templates
├── Properties Panel (right)
│   ├── Style properties (colors, fonts, spacing)
│   ├── Component-specific settings
│   ├── Advanced CSS editor
│   └── Responsive overrides
├── Pages Panel (left)
│   ├── List of pages in site
│   ├── Add/delete pages
│   ├── Reorder pages
│   └── Set homepage
└── Toolbar (top)
    ├── Save/publish buttons
    ├── Device preview toggle
    ├── Zoom controls
    ├── Undo/Redo
    └── Settings
```

### Implementation Steps

**Step 1: Install Dependencies**
```bash
npm install @react-dnd/sortable
npm install react-dnd@16.0.1  # Already installed
npm install framer-motion@11.0.8  # Already installed
npm install zustand@4.5.2  # Already installed (for store)
```

**Step 2: Create Store**
```typescript
// lib/store/builder.ts
import { create } from 'zustand';

interface Component {
  id: string;
  type: string; // 'button', 'card', 'section', etc.
  props: Record<string, any>;
  children: Component[];
}

interface Page {
  id: string;
  title: string;
  slug: string;
  components: Component[];
  settings: Record<string, any>;
}

interface BuilderStore {
  currentSite: string | null;
  pages: Page[];
  currentPageId: string | null;
  selectedComponentId: string | null;
  // ... methods
}

export const useBuilder = create<BuilderStore>((set) => ({...}));
```

**Step 3: Create Canvas Component**
```typescript
// components/site-builder/canvas.tsx
export function Canvas() {
  // Render components with drag-and-drop
  // Handle component updates
  // Live preview rendering
}
```

**Step 4: Create Component Library**
```typescript
// components/site-builder/component-library.tsx
export const AVAILABLE_COMPONENTS = [
  {
    type: 'hero',
    name: 'Hero Section',
    category: 'layout',
    template: {...},
  },
  {
    type: 'button',
    name: 'Button',
    category: 'elements',
    template: {...},
  },
  // ... more components
];
```

**Step 5: Create Properties Panel**
```typescript
// components/site-builder/properties-panel.tsx
export function PropertiesPanel() {
  // Show component properties
  // Allow editing
  // Sync to store
}
```

### Database Queries Needed
- Get user's site: `SELECT * FROM sites WHERE id = :siteId AND userId = :userId`
- Get pages: `SELECT * FROM pages WHERE siteId = :siteId`
- Update page content: `UPDATE pages SET content = :content WHERE id = :pageId`

### Testing Checklist
- [ ] Drag components to canvas
- [ ] Edit component properties
- [ ] Save changes
- [ ] Undo/redo works
- [ ] Responsive preview works
- [ ] Page switching works

---

## GAP 2: PAYMENT INTEGRATION (CRITICAL - Blocks Revenue)

### Step 1: bKash Integration

**Setup bKash Merchant Account:**
1. Register at `https://merchant.bkash.com`
2. Get API credentials: `app_key`, `app_secret`, `username`, `password`

**Implementation:**

```typescript
// lib/payments/bkash.ts
export class BkashClient {
  private appKey: string;
  private appSecret: string;
  private username: string;
  private password: string;
  private baseUrl: string;

  constructor() {
    this.appKey = process.env.BKASH_APP_KEY!;
    this.appSecret = process.env.BKASH_APP_SECRET!;
    this.username = process.env.BKASH_USERNAME!;
    this.password = process.env.BKASH_PASSWORD!;
    this.baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://api.bkash.com/api'
      : 'https://api-sandbox.bkash.com/api';
  }

  async getToken(): Promise<string> {
    // Get authorization token
  }

  async createPayment(params: {
    amount: number;
    merchantInvoiceNumber: string;
    callbackURL: string;
  }): Promise<{paymentURL: string; paymentID: string}> {
    // Create payment request
  }

  async executePayment(paymentID: string, token: string): Promise<{
    transactionID: string;
    amount: number;
  }> {
    // Execute payment after user confirmation
  }

  async queryPayment(paymentID: string): Promise<any> {
    // Query payment status
  }
}
```

**Create Payment Route:**

```typescript
// app/api/payments/bkash/create/route.ts
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  const { subscriptionId, amount } = await req.json();

  const bkash = new BkashClient();
  const { paymentURL, paymentID } = await bkash.createPayment({
    amount,
    merchantInvoiceNumber: subscriptionId,
    callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/payments/bkash/callback`,
  });

  // Save payment record
  await db.insert(payments).values({
    userId: session.user.id,
    subscriptionId,
    amount,
    provider: 'bkash',
    providerPaymentId: paymentID,
    status: 'pending',
  });

  return NextResponse.json({ redirectURL: paymentURL });
}
```

**Create Webhook Handler:**

```typescript
// app/api/payments/bkash/webhook/route.ts
export async function POST(req: NextRequest) {
  const { paymentID, status, transactionID } = await req.json();

  // Verify payment with bKash
  const bkash = new BkashClient();
  const paymentStatus = await bkash.queryPayment(paymentID);

  // Update payment record
  await db.update(payments)
    .set({
      status: paymentStatus === 'Completed' ? 'completed' : 'failed',
      providerPaymentId: transactionID,
    })
    .where(eq(payments.providerPaymentId, paymentID));

  // If successful, activate subscription
  if (paymentStatus === 'Completed') {
    const payment = await db.query.payments.findFirst({
      where: eq(payments.providerPaymentId, paymentID),
    });

    if (payment) {
      // Update subscription
      const now = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await db.update(subscriptions)
        .set({
          status: 'active',
          currentPeriodStart: now,
          currentPeriodEnd: endDate,
        })
        .where(eq(subscriptions.id, payment.subscriptionId));
    }
  }

  return NextResponse.json({ success: true });
}
```

### Step 2: Nagad Integration

**Similar to bKash** - Follow same pattern but with Nagad API:

```typescript
// lib/payments/nagad.ts
export class NagadClient {
  // Similar structure to BkashClient
}
```

### Environment Variables Required

```
BKASH_APP_KEY=your_app_key
BKASH_APP_SECRET=your_app_secret
BKASH_USERNAME=your_username
BKASH_PASSWORD=your_password
NAGAD_APP_ID=your_app_id
NAGAD_APP_KEY=your_app_key
NAGAD_PUBLIC_KEY=your_public_key
```

### Testing Checklist
- [ ] Payment request created
- [ ] User can access payment link
- [ ] Webhook receives callback
- [ ] Subscription activated after payment
- [ ] Payment record created
- [ ] Failed payment handled

---

## GAP 3: TEMPLATE MANAGEMENT APIs (HIGH - Needed for core feature)

**Files to Create:**

```typescript
// app/api/templates/route.ts
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const isPremium = searchParams.get('premium') === 'true';

  let query = db.query.templates.findMany({
    where: and(
      eq(templates.isActive, true),
      category ? eq(templates.category, category) : undefined,
      isPremium !== undefined ? eq(templates.isPremium, isPremium) : undefined,
    ),
  });

  return NextResponse.json({templates: await query});
}

// app/api/templates/[id]/route.ts
export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const template = await db.query.templates.findFirst({
    where: eq(templates.id, params.id),
  });

  return NextResponse.json({template});
}

// app/api/sites/from-template/route.ts
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  const { templateId, siteName } = await req.json();

  // Get template
  const template = await db.query.templates.findFirst({
    where: eq(templates.id, templateId),
  });

  if (!template) return NextResponse.json({error: 'Template not found'}, {status: 404});

  // Create site from template
  const [site] = await db.insert(sites).values({
    userId: session.user.id,
    name: siteName,
    slug: slugify(siteName),
    templateId: template.id,
    status: 'draft',
    settings: template.content,
  }).returning();

  // Create homepage
  await db.insert(pages).values({
    siteId: site.id,
    title: 'Home',
    slug: 'home',
    isHomepage: true,
    content: template.content,
  });

  return NextResponse.json({site}, {status: 201});
}
```

### Testing Checklist
- [ ] List templates by category
- [ ] Get single template details
- [ ] Create site from template
- [ ] Site has homepage created
- [ ] Template content is copied correctly

---

## GAP 4: EMAIL SYSTEM (HIGH - Needed for UX)

**Choose Email Service:**
- SendGrid (recommended)
- Resend (modern, simpler)
- AWS SES (cheaper at scale)

**Example with Resend:**

```typescript
// lib/email/client.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'welcome@bangla.design',
    to: email,
    subject: 'Welcome to Bangla.design!',
    html: `<h1>Welcome ${name}!</h1><p>You're all set. Start building...</p>`,
  });
}
```

### Needed Emails
- Welcome (after registration)
- Password reset
- Subscription confirmation
- Invoice
- Payment receipt
- Trial ending

---

## QUICK START PRIORITIES

**Week 1-2:**
1. **Implement Template APIs** (1 week) - Unblocks template browsing
2. **Implement Site CRUD APIs** (1 week) - Unblocks site management

**Week 3-4:**
3. **Payment Integration** (2 weeks) - Unblocks revenue

**Week 5-6:**
4. **Site Builder UI** (2 weeks) - Unblocks core feature

**Week 7+:**
5. Continue with remaining gaps

---

## DATABASE INDEXING FOR PERFORMANCE

Add these indexes before launch:

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);

-- Sites
CREATE INDEX idx_sites_user_id ON sites(user_id);
CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_sites_status ON sites(status);

-- Pages
CREATE INDEX idx_pages_site_id ON pages(site_id);
CREATE INDEX idx_pages_slug ON pages(slug);

-- Subscriptions
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_current_period_end ON subscriptions(current_period_end);

-- Payments
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_provider ON payments(provider);
CREATE INDEX idx_payments_status ON payments(status);

-- AI Generations
CREATE INDEX idx_ai_generations_user_id ON ai_generations(user_id);
CREATE INDEX idx_ai_generations_created_at ON ai_generations(created_at);
CREATE INDEX idx_ai_generations_status ON ai_generations(status);
```

---

## SUCCESS METRICS

After implementing each gap, verify:

1. **Site Builder UI**
   - [ ] Users can add components
   - [ ] Users can see live preview
   - [ ] Changes are saved to database
   - [ ] Performance <1s for common operations

2. **Payment Integration**
   - [ ] Users can initiate payment
   - [ ] Webhook receives callback
   - [ ] Subscription is activated
   - [ ] 99.9% payment success rate

3. **Email System**
   - [ ] 95%+ email delivery rate
   - [ ] <2 second send time
   - [ ] Proper formatting in all clients

4. **Admin Dashboard**
   - [ ] All KPIs visible
   - [ ] <1 second load time
   - [ ] Full user/payment management

