-- 1. Create a table for User Profiles
create table profiles (
  id uuid references auth.users not null primary key,
  name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table profiles enable row level security;

-- Allow public read access (so anyone can see author names)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- Allow logged-in users to insert their own profile
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

-- Allow logged-in users to update their own profile
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );


-- 2. Create a table for Summaries
create table summaries (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject text not null,
  description text not null,
  file_url text,
  user_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table summaries enable row level security;

-- Allow public read access to all summaries
create policy "Summaries are viewable by everyone."
  on summaries for select
  using ( true );

-- Allow logged in users to insert summaries
create policy "Authenticated users can create summaries"
  on summaries for insert
  with check ( auth.role() = 'authenticated' );

-- Allow users to update their own summaries
create policy "Users can update their own summaries."
  on summaries for update
  using ( auth.uid() = user_id );

-- Allow users to delete their own summaries
create policy "Users can delete their own summaries."
  on summaries for delete
  using ( auth.uid() = user_id );

