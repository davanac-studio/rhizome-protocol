create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  due_date date not null,
  thumbnail text not null,
  category text not null,
  client text not null,
  testimonial text,
  github_link text,
  preview_link text,
  team_leader uuid references auth.users(id) not null,
  team_leader_contribution integer not null,
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