# OAuth2 User Management

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
```

# Creating Tables

```sql

CREATE TABLE projects (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  description TEXT,
  focus INT2,
  logo TEXT,
  image TEXT
);

CREATE TABLE links (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  project UUID REFERENCES projects(id) ON DELETE CASCADE,
  text TEXT,
  link TEXT,
  created_at TIMESTAMPTZ
);

CREATE TABLE feedbacks (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  created_at TIMESTAMPTZ,
  category INT2,
  avatar_url TEXT REFERENCES public.profiles(avatar_url) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  published BOOLEAN,
  project UUID REFERENCES public.projects(id),
  user_agent TEXT,
  title TEXT,
  content JSONB
);

CREATE TABLE documents (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  uploaded_at TIMESTAMPTZ,
  project UUID REFERENCES public.projects(id),
  name TEXT,
  link TEXT
);

CREATE TABLE deliverables (
  id UUID PRIMARY KEY UNIQUE NOT NULL,
  created_at TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  project UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT,
  value INT2,
  category INT2
);

CREATE TABLE comments (
  id UUID PRIMARY KEY REFERENCES public.feedbacks(id) UNIQUE NOT NULL ON DELETE CASCADE ,
  content TEXT,
  created_at TIMESTAMPTZ,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE
);

CREATE TABLE admins (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) UNIQUE NOT NULL ON DELETE CASCADE
);
```

# Hardening

Users can SELECT, but not INSERT, UPDATE or DELETE :

```sql
CREATE OR REPLACE FUNCTION check_admin_access() RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.admins WHERE id = auth.id()) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'You do not have permission to perform this operation on table %.', TG_TABLE_NAME;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_admin_trigger_documents
BEFORE INSERT OR UPDATE OR DELETE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION check_admin_access();

CREATE TRIGGER check_admin_trigger_projects
BEFORE INSERT OR UPDATE OR DELETE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION check_admin_access();

CREATE TRIGGER check_admin_trigger_links
BEFORE INSERT OR UPDATE OR DELETE ON public.links
FOR EACH ROW
EXECUTE FUNCTION check_admin_access();
```

# Backup functions

1.  Create a function that calls pg_dumpall using the COPY TO PROGRAM command:

```sql
CREATE OR REPLACE FUNCTION dump_database()
RETURNS VOID AS $$
BEGIN
  EXECUTE 'COPY (SELECT pg_dumpall) TO PROGRAM ''gzip > /tmp/db_dump.gz''';
END;
$$ LANGUAGE plpgsql;
```

2.  Create a second function that uploads the compressed dump file to the storage schema. Here's an example using Supabase's storage.upload function:

```sql
CREATE OR REPLACE FUNCTION upload_dump_to_storage()
RETURNS VOID AS $$
DECLARE
  file_content bytea;
BEGIN
  -- Read the compressed dump file into a bytea variable
  SELECT pg_read_binary_file('/tmp/db_dump.gz') INTO file_content;

  -- Upload the file to the storage schema using Supabase's storage.upload function
  SELECT storage.upload('s3://my-bucket/db_dump.gz', file_content, 'application/gzip');
END;
$$ LANGUAGE plpgsql;
```

3.  Finally, you can create a third function that combines the two functions above to dump and upload the database in one step:

```sql
CREATE OR REPLACE FUNCTION dump_and_upload_database()
RETURNS VOID AS $$
BEGIN
  PERFORM dump_database();
  PERFORM upload_dump_to_storage();
END;
$$ LANGUAGE plpgsql;
```
