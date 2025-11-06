-- Create teachers table for authentication
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table for the question bank
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  specialty TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  source TEXT DEFAULT 'system',
  teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table for educational resources
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  specialty TEXT NOT NULL,
  content_type TEXT NOT NULL,
  description TEXT NOT NULL,
  content_text TEXT NOT NULL,
  tags TEXT[],
  source TEXT DEFAULT 'system',
  teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table for the social blog feature (Atribuir)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id) NOT NULL,
  teacher_name TEXT NOT NULL,
  post_type TEXT NOT NULL, -- 'message', 'tip', 'question'
  title TEXT,
  content TEXT NOT NULL,
  subject TEXT,
  specialty TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table for posts
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES teachers(id) NOT NULL,
  teacher_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for teachers table
CREATE POLICY "Teachers can view all teachers" ON teachers FOR SELECT USING (true);
CREATE POLICY "Teachers can insert their own profile" ON teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Teachers can update their own profile" ON teachers FOR UPDATE USING (auth.uid()::text = id::text);

-- Create policies for questions table
CREATE POLICY "Anyone can view questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Teachers can insert questions" ON questions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Teachers can update their own questions" ON questions FOR UPDATE USING (teacher_id = auth.uid());
CREATE POLICY "Teachers can delete their own questions" ON questions FOR DELETE USING (teacher_id = auth.uid());

-- Create policies for content table
CREATE POLICY "Anyone can view content" ON content FOR SELECT USING (true);
CREATE POLICY "Teachers can insert content" ON content FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Teachers can update their own content" ON content FOR UPDATE USING (teacher_id = auth.uid());
CREATE POLICY "Teachers can delete their own content" ON content FOR DELETE USING (teacher_id = auth.uid());

-- Create policies for posts table
CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Teachers can insert posts" ON posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Teachers can update their own posts" ON posts FOR UPDATE USING (teacher_id = auth.uid());
CREATE POLICY "Teachers can delete their own posts" ON posts FOR DELETE USING (teacher_id = auth.uid());

-- Create policies for comments table
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Teachers can insert comments" ON comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Teachers can update their own comments" ON comments FOR UPDATE USING (teacher_id = auth.uid());
CREATE POLICY "Teachers can delete their own comments" ON comments FOR DELETE USING (teacher_id = auth.uid());
