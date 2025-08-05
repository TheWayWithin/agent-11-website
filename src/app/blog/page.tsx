import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introducing the /coord Command: Mission-Driven Development',
    excerpt: 'Learn how the new /coord command revolutionizes AI-powered development with mission-based workflows and project-local agents.',
    date: 'December 15, 2024',
    author: 'AGENT-11 Team',
    category: 'Product Updates',
    readTime: '5 min read',
    tags: ['coord', 'missions', 'workflow']
  },
  {
    id: '2',
    title: 'Building a SaaS MVP in 3 Days: Real Case Study',
    excerpt: 'Follow along as we use AGENT-11 to build a complete task management SaaS from concept to deployment in just 3 days.',
    date: 'December 10, 2024',
    author: 'Sarah Chen',
    category: 'Case Studies',
    readTime: '8 min read',
    tags: ['mvp', 'saas', 'case-study']
  },
  {
    id: '3',
    title: 'The Science Behind Project-Local AI Agents',
    excerpt: 'Deep dive into how AGENT-11 agents understand your codebase context and make intelligent decisions based on your project structure.',
    date: 'December 5, 2024',
    author: 'Dr. Alex Rodriguez',
    category: 'Technical',
    readTime: '12 min read',
    tags: ['ai', 'architecture', 'context']
  },
  {
    id: '4',
    title: 'Choosing the Right Squad Size for Your Project',
    excerpt: 'A comprehensive guide to selecting between Minimal, Core, and Full squads based on your project needs and complexity.',
    date: 'November 28, 2024',
    author: 'Mike Thompson',
    category: 'Guides',
    readTime: '6 min read',
    tags: ['squad-size', 'planning', 'best-practices']
  },
  {
    id: '5',
    title: 'Security Best Practices with AGENT-11',
    excerpt: 'Essential security considerations when using AI agents for development, including credential management and code review processes.',
    date: 'November 20, 2024',
    author: 'Jessica Park',
    category: 'Security',
    readTime: '10 min read',
    tags: ['security', 'best-practices', 'compliance']
  },
  {
    id: '6',
    title: 'From Idea to Production: E-commerce Platform in 5 Days',
    excerpt: 'Complete walkthrough of building a full-featured e-commerce platform using AGENT-11\'s Full squad and strategic missions.',
    date: 'November 15, 2024',
    author: 'David Kim',
    category: 'Case Studies',
    readTime: '15 min read',
    tags: ['ecommerce', 'full-stack', 'production']
  }
]

const categories = ['All', 'Product Updates', 'Case Studies', 'Technical', 'Guides', 'Security']

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              AGENT-11
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/blog" className="text-primary-600 font-medium">Blog</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              AGENT-11 Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and stories from the world of AI-powered development. 
              Learn how teams are building faster with mission-driven workflows.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-primary-700 text-sm">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>{blogPosts[0].author}</span>
                  <span>•</span>
                  <span>{blogPosts[0].date}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Read Article
                </button>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary-600 text-sm font-medium">{post.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <div>{post.author}</div>
                      <div>{post.date}</div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest articles, case studies, and AGENT-11 updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Join 2,847+ developers. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  )
}