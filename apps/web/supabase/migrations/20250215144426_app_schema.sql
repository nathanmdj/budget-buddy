-- Enum type for fund account types
ALTER TABLE IF EXISTS public.accounts ADD COLUMN IF NOT EXISTS monthly_income NUMERIC(10,2) NOT NULL DEFAULT 0;
CREATE TYPE fund_account_type AS ENUM ('bank', 'e-wallet', 'savings', 'investment', 'cash', 'card', 'other');

-- Fund accounts table
CREATE TABLE IF NOT EXISTS public.fund_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id),
    name TEXT NOT NULL,
    type fund_account_type NOT NULL,
    balance NUMERIC(10,2) NOT NULL DEFAULT 0,  -- Added precision
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.fund_accounts ENABLE ROW LEVEL SECURITY;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fund_accounts TO authenticated;

-- Users can manage their own fund accounts
CREATE POLICY "Users can read their own fund accounts" ON public.fund_accounts
FOR SELECT
TO authenticated
USING (account_id = auth.uid());

CREATE POLICY "Users can insert their own fund accounts" ON public.fund_accounts
FOR INSERT
TO authenticated
WITH CHECK (account_id = auth.uid());

CREATE POLICY "Users can update their own fund accounts" ON public.fund_accounts
FOR UPDATE
TO authenticated
USING (account_id = auth.uid());

CREATE POLICY "Users can delete their own fund accounts" ON public.fund_accounts
FOR DELETE
TO authenticated
USING (account_id = auth.uid());

-- ✅ Add trigger to set `account_id` automatically
CREATE OR REPLACE FUNCTION enforce_fund_account_owner()
RETURNS TRIGGER AS $$
BEGIN
  NEW.account_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_fund_account_owner
BEFORE INSERT ON fund_accounts
FOR EACH ROW
EXECUTE FUNCTION enforce_fund_account_owner();

-- ✅ Ensure `updated_at` is automatically updated on updates
CREATE OR REPLACE FUNCTION update_fund_accounts_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_fund_accounts_updated_at
BEFORE UPDATE ON fund_accounts
FOR EACH ROW
EXECUTE FUNCTION update_fund_accounts_timestamp();

CREATE TABLE IF NOT EXISTS public.budget_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id),
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    income NUMERIC(10,2) NOT NULL DEFAULT 0,
    categories_allocated JSONB NOT NULL DEFAULT '{}',
    categories_spent JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.budget_plans TO authenticated;
ALTER TABLE IF EXISTS public.budget_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own budget plans" ON public.budget_plans
FOR SELECT
TO authenticated
USING (account_id = auth.uid());

CREATE POLICY "Users can insert their own budget plans" ON public.budget_plans
FOR INSERT
TO authenticated
WITH CHECK (account_id = auth.uid());

CREATE POLICY "Users can update their own budget plans" ON public.budget_plans
FOR UPDATE
TO authenticated
USING (account_id = auth.uid());
