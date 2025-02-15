create type fund_account_type as enum ('checking', 'savings', 'investment', 'cash', 'card', 'other');

create table if not exists fund_accounts (
    id uuid primary key default uuid_generate_v4(),
    account_id uuid not null references accounts(id),
    name text not null,
    type fund_account_type not null,
    balance numeric not null default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

alter table fund_accounts enable row level security;

create policy "Users can view their own fund accounts" on fund_accounts
    for select
    to authenticated
    using (account_id = auth.uid());

create policy "Users can manage their own fund accounts" on fund_accounts
    for all
    to authenticated
    using (account_id = auth.uid())
    with check (account_id = auth.uid());

