create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  username text unique,
  avatar_url text,
  banner_url text,
  bio text,
  expertise text,
  role text,
  linkedin text,
  youtube text,
  github text,
  spotify text,
  instagram text,
  facebook text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.projects (
  id text primary key,
  title text not null,
  description text not null,
  due_date date not null,
  thumbnail text not null,
  category text not null,
  client text not null,
  testimonial text,
  github_link text,
  preview_link text,
  team_leader uuid references public.profiles(id) not null,
  team_leader_contribution integer,
  team_leader_contribution_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies
create policy "Projects are viewable by everyone" 
on public.projects for select 
to authenticated
using (true);

create policy "Users can insert their own projects" 
on public.projects for insert 
to authenticated 
with check (auth.uid() = team_leader);

create policy "Users can update their own projects" 
on public.projects for update 
to authenticated 
using (auth.uid() = team_leader);

create policy "Users can delete their own projects" 
on public.projects for delete 
to authenticated 
using (auth.uid() = team_leader);

-- Create the join table for project participants
create table public.project_participants (
  id uuid primary key default uuid_generate_v4(),
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  contribution integer,
  contribution_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, user_id)
);

-- Set up RLS for project_participants
alter table public.project_participants enable row level security;

-- Create policies for project_participants
create policy "Project participants are viewable by everyone"
on public.project_participants for select
to authenticated
using (true);

create policy "Users can manage their own participant entries"
on public.project_participants for all
to authenticated
using (auth.uid() = user_id);