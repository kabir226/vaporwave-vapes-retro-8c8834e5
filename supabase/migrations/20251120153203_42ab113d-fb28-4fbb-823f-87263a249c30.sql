-- Fix RLS policies for security issues

-- 1. Fix profiles table - restrict public access
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Add admin access to order_items for customer support
CREATE POLICY "Admins can view all order items"
ON public.order_items FOR SELECT
TO authenticated  
USING (public.has_role(auth.uid(), 'admin'));