-- Seed Plans
INSERT INTO plans (name, name_bn, slug, description, description_bn, price, features, features_bn, max_sites, max_pages, max_storage, max_bandwidth, ai_generations, custom_domain, remove_watermark, priority_support, sort_order)
VALUES 
  (
    'Free', 
    'ফ্রি', 
    'free', 
    'Perfect for trying out Bangla.design', 
    'Bangla.design ব্যবহার করে দেখার জন্য উপযুক্ত',
    0,
    '["1 Website", "5 Pages", "100MB Storage", "Bangla.design subdomain", "Basic templates", "Community support"]',
    '["১টি ওয়েবসাইট", "৫টি পেজ", "১০০MB স্টোরেজ", "Bangla.design সাবডোমেইন", "বেসিক টেমপ্লেট", "কমিউনিটি সাপোর্ট"]',
    1, 5, 100, 1000, 10, false, false, false, 0
  ),
  (
    'Starter', 
    'স্টার্টার', 
    'starter', 
    'For individuals and small businesses', 
    'ব্যক্তিগত এবং ছোট ব্যবসার জন্য',
    499,
    '["3 Websites", "20 Pages per site", "1GB Storage", "Custom domain", "All templates", "Email support", "50 AI generations/month"]',
    '["৩টি ওয়েবসাইট", "প্রতি সাইটে ২০টি পেজ", "১GB স্টোরেজ", "কাস্টম ডোমেইন", "সকল টেমপ্লেট", "ইমেইল সাপোর্ট", "৫০টি AI জেনারেশন/মাস"]',
    3, 20, 1000, 10000, 50, true, false, false, 1
  ),
  (
    'Pro', 
    'প্রো', 
    'pro', 
    'For growing businesses', 
    'বর্ধনশীল ব্যবসার জন্য',
    1999,
    '["10 Websites", "Unlimited Pages", "10GB Storage", "Custom domain", "Premium templates", "Priority support", "200 AI generations/month", "Remove watermark", "Analytics"]',
    '["১০টি ওয়েবসাইট", "আনলিমিটেড পেজ", "১০GB স্টোরেজ", "কাস্টম ডোমেইন", "প্রিমিয়াম টেমপ্লেট", "প্রায়োরিটি সাপোর্ট", "২০০টি AI জেনারেশন/মাস", "ওয়াটারমার্ক সরান", "এনালিটিক্স"]',
    10, 999, 10000, 100000, 200, true, true, true, 2
  ),
  (
    'Business', 
    'বিজনেস', 
    'business', 
    'For enterprises and agencies', 
    'এন্টারপ্রাইজ এবং এজেন্সির জন্য',
    4999,
    '["Unlimited Websites", "Unlimited Pages", "100GB Storage", "Custom domain", "All templates", "24/7 Priority support", "Unlimited AI generations", "Remove watermark", "Advanced analytics", "API access", "White-label option"]',
    '["আনলিমিটেড ওয়েবসাইট", "আনলিমিটেড পেজ", "১০০GB স্টোরেজ", "কাস্টম ডোমেইন", "সকল টেমপ্লেট", "২৪/৭ প্রায়োরিটি সাপোর্ট", "আনলিমিটেড AI জেনারেশন", "ওয়াটারমার্ক সরান", "অ্যাডভান্সড এনালিটিক্স", "API অ্যাক্সেস", "হোয়াইট-লেবেল অপশন"]',
    999, 999, 100000, 1000000, 9999, true, true, true, 3
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Templates
INSERT INTO templates (name, name_bn, slug, description, description_bn, category, thumbnail, is_premium, is_active)
VALUES 
  ('Business Landing', 'বিজনেস ল্যান্ডিং', 'business-landing', 'Professional landing page for businesses', 'ব্যবসার জন্য প্রফেশনাল ল্যান্ডিং পেজ', 'business', '/templates/business-landing.jpg', false, true),
  ('Restaurant', 'রেস্টুরেন্ট', 'restaurant', 'Beautiful template for restaurants and cafes', 'রেস্টুরেন্ট এবং ক্যাফের জন্য সুন্দর টেমপ্লেট', 'food', '/templates/restaurant.jpg', false, true),
  ('Portfolio', 'পোর্টফোলিও', 'portfolio', 'Showcase your work with this elegant portfolio', 'এই সুন্দর পোর্টফোলিও দিয়ে আপনার কাজ দেখান', 'creative', '/templates/portfolio.jpg', false, true),
  ('E-commerce', 'ই-কমার্স', 'ecommerce', 'Start selling online with this shop template', 'এই শপ টেমপ্লেট দিয়ে অনলাইনে বিক্রি শুরু করুন', 'shop', '/templates/ecommerce.jpg', true, true),
  ('Blog', 'ব্লগ', 'blog', 'Share your stories with a beautiful blog', 'সুন্দর ব্লগ দিয়ে আপনার গল্প শেয়ার করুন', 'blog', '/templates/blog.jpg', false, true),
  ('Education', 'শিক্ষা', 'education', 'Perfect for schools and online courses', 'স্কুল এবং অনলাইন কোর্সের জন্য উপযুক্ত', 'education', '/templates/education.jpg', true, true),
  ('Healthcare', 'স্বাস্থ্যসেবা', 'healthcare', 'Professional template for clinics and doctors', 'ক্লিনিক এবং ডাক্তারদের জন্য প্রফেশনাল টেমপ্লেট', 'health', '/templates/healthcare.jpg', true, true),
  ('NGO', 'এনজিও', 'ngo', 'Template for non-profit organizations', 'অলাভজনক সংস্থার জন্য টেমপ্লেট', 'nonprofit', '/templates/ngo.jpg', false, true)
ON CONFLICT (slug) DO NOTHING;
