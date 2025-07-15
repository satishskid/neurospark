# NeuroSpark Integration Guide

This guide helps developers integrate real services (Clerk, Stripe, Database) to replace the current mock implementations.

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   npm install
   cp .env.local.example .env.local
   # Fill in your API keys in .env.local
   ```

2. **Choose Your Integration Path**
   - **MVP**: Keep mocks, add real AI API
   - **Production**: Full Clerk + Stripe + Database integration

## 🔐 Clerk Authentication Integration

### 1. Install Clerk
```bash
npm install @clerk/nextjs @clerk/themes
```

### 2. Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 3. Replace Mock Authentication
**File: `services/clerkService.ts`**

Replace mock functions with real Clerk calls:

```typescript
// Replace this mock function:
async authenticateAdmin(email: string, password: string): Promise<boolean> {
  return email === 'admin@neurospark.ai' && password === 'admin123';
}

// With real Clerk authentication:
import { useSignIn } from '@clerk/nextjs';

async authenticateAdmin(email: string, password: string): Promise<boolean> {
  const { signIn } = useSignIn();
  const result = await signIn.create({
    identifier: email,
    password: password,
  });
  return result.status === 'complete';
}
```

### 4. User Management Integration
```typescript
import { clerkClient } from '@clerk/nextjs';

async getUsers(page: number, limit: number) {
  const users = await clerkClient.users.getUserList({
    limit: limit,
    offset: (page - 1) * limit,
  });
  
  return {
    users: users.map(this.mapClerkUserToDetailedUser),
    total: users.totalCount
  };
}
```

### 5. Webhook Setup
Create `/api/webhooks/clerk.ts`:
```typescript
import { clerkClient } from '@clerk/nextjs';
import { WebhookEvent } from '@clerk/nextjs/server';

export default async function handler(req: NextRequest) {
  const event = req.body as WebhookEvent;
  
  switch (event.type) {
    case 'user.created':
      // Handle new user registration
      break;
    case 'user.updated':
      // Handle user profile updates
      break;
  }
}
```

## 💳 Stripe Payment Integration

### 1. Install Stripe
```bash
npm install stripe @stripe/stripe-js
```

### 2. Environment Variables
Add to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Replace Mock Payment Functions
**File: `services/paymentService.ts`**

```typescript
import Stripe from 'stripe';

private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

async createSubscription(customerId: string, priceId: string) {
  const subscription = await this.stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
  
  return this.mapStripeSubscriptionToUserSubscription(subscription);
}
```

### 4. Webhook Handling
Create `/api/webhooks/stripe.ts`:
```typescript
import { stripe } from '@/lib/stripe';

export default async function handler(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'customer.subscription.created':
      // Handle new subscription
      break;
    case 'invoice.payment_succeeded':
      // Handle successful payment
      break;
  }
}
```

## 🗄️ Database Integration

### Option 1: PostgreSQL with Prisma

1. **Install Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Schema Example** (`prisma/schema.prisma`):
   ```prisma
   model User {
     id              String   @id @default(cuid())
     clerkId         String   @unique
     email           String   @unique
     name            String?
     createdAt       DateTime @default(now())
     updatedAt       DateTime @updatedAt
     
     // Learning Progress
     completedLessons String[]
     currentModule    String?
     totalTimeSpent   Int      @default(0)
     streakDays       Int      @default(0)
     
     // Subscription
     subscription     Subscription?
     
     @@map("users")
   }
   
   model Subscription {
     id           String   @id @default(cuid())
     userId       String   @unique
     stripeId     String   @unique
     planId       String
     status       String
     currentPeriodStart DateTime
     currentPeriodEnd   DateTime
     
     user         User     @relation(fields: [userId], references: [id])
     
     @@map("subscriptions")
   }
   ```

3. **Database Service** (`services/databaseService.ts`):
   ```typescript
   import { PrismaClient } from '@prisma/client';
   
   const prisma = new PrismaClient();
   
   export class DatabaseService {
     async createUser(clerkId: string, email: string, name?: string) {
       return await prisma.user.create({
         data: { clerkId, email, name }
       });
     }
     
     async getUserByClerkId(clerkId: string) {
       return await prisma.user.findUnique({
         where: { clerkId },
         include: { subscription: true }
       });
     }
   }
   ```

### Option 2: Supabase

1. **Install Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Client Setup** (`lib/supabase.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   
   export const supabase = createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!
   );
   ```

## 🔄 Migration Strategy

### Phase 1: Authentication (Week 1)
- [ ] Set up Clerk authentication
- [ ] Replace admin login with Clerk
- [ ] Implement user management via Clerk
- [ ] Test user registration flow

### Phase 2: Payments (Week 2)
- [ ] Set up Stripe products and prices
- [ ] Implement subscription creation
- [ ] Add webhook handling
- [ ] Test payment flows

### Phase 3: Database (Week 3)
- [ ] Choose and set up database
- [ ] Create user and subscription models
- [ ] Migrate user progress tracking
- [ ] Implement analytics storage

### Phase 4: Production (Week 4)
- [ ] Set up monitoring and logging
- [ ] Configure production environment
- [ ] Deploy and test
- [ ] Monitor and optimize

## 🧪 Testing Strategy

### Unit Tests
```bash
npm run test
```

### Integration Tests
```typescript
// Test Clerk integration
describe('ClerkService', () => {
  it('should authenticate admin users', async () => {
    const result = await clerkService.authenticateAdmin(
      'admin@neurospark.ai', 
      'password'
    );
    expect(result).toBe(true);
  });
});

// Test Stripe integration
describe('PaymentService', () => {
  it('should create subscription', async () => {
    const subscription = await paymentService.createSubscription(
      'cus_test', 
      'price_test'
    );
    expect(subscription.status).toBe('active');
  });
});
```

## 🚨 Important Notes

### Security Considerations
- Never expose secret keys in client-side code
- Validate all webhook signatures
- Implement proper CORS policies
- Use HTTPS in production

### Performance Optimization
- Implement caching for user data
- Use database indexes for queries
- Optimize API calls with batching
- Monitor response times

### Error Handling
- Implement proper error boundaries
- Log errors for debugging
- Provide user-friendly error messages
- Set up error monitoring (Sentry)

## 📞 Support

For integration help:
1. Check the TODO comments in service files
2. Review the mock implementations for expected behavior
3. Test with small changes first
4. Use the admin panel to verify integrations

## 🔗 Useful Links

- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
