import React, { useState, useEffect, useRef } from 'react';
import './Docs.css';

const Docs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'cloud'>('local');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Navigation items for local deployment
  const localNavItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'core-features', label: 'Core Features' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'quick-start', label: 'Quick Start' },
    { id: 'contributing', label: 'Contributing' },
    { id: 'license', label: 'License' }
  ];
  
  // Navigation items for cloud API
  const cloudNavItems = [
    { id: 'api-overview', label: 'API Overview' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'add-memory', label: 'Add Memory' },
    { id: 'retrieve-memory', label: 'Retrieve Memory' },
    { id: 'user-profile', label: 'User Profile' },
    { id: 'error-handling', label: 'Error Handling' },
    { id: 'rate-limiting', label: 'Rate Limiting' }
  ];
  
  const currentNavItems = activeTab === 'local' ? localNavItems : cloudNavItems;
  
  const getSectionTopInContainer = (sectionEl: HTMLElement, containerEl: HTMLElement) => {
    // Convert viewport-relative coordinates to container scroll coordinates
    const sectionRect = sectionEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();
    return sectionRect.top - containerRect.top + containerEl.scrollTop;
  };

  // 处理滚动时的高亮显示 - 修复License高亮问题
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const container = contentRef.current;
      const scrollTop = container.scrollTop;
      const triggerLine = scrollTop + Math.max(80, container.clientHeight / 4);

      const sectionEls = currentNavItems
        .map(item => document.getElementById(item.id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (sectionEls.length === 0) return;

      // 如果已经滚动到底部，强制高亮最后一个（常见：最后一节高度不足，无法“顶到上方”触发阈值）
      const isAtBottom = scrollTop + container.clientHeight >= container.scrollHeight - 2;
      let currentSectionId = isAtBottom ? sectionEls[sectionEls.length - 1].id : '';

      if (!isAtBottom) {
        for (const sectionEl of sectionEls) {
          const sectionTop = getSectionTopInContainer(sectionEl, container);
          if (sectionTop <= triggerLine) currentSectionId = sectionEl.id;
        }
      }

      if (currentSectionId) {
        setActiveSection(prev => (prev === currentSectionId ? prev : currentSectionId));
      }
    };
    
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      // 初始调用一次以设置初始高亮
      handleScroll();
      
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab, currentNavItems]);
  
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const yOffset = -20; // 让标题更贴近容器顶部（容器内部滚动，不需要为fixed header预留太多）
      const y = getSectionTopInContainer(element, contentRef.current) + yOffset;
      contentRef.current.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  // navigate 暂时保留：后续如需在 Docs 页添加跳转按钮可直接使用

  // 切换侧边栏可见性
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="docs-page">
      {/* Top Navigation Bar - 与Home页面保持一致 */}
    

      {/* Docs 顶部导航栏 - 保持不变 */}
      <div className="docs-header-nav">
        <div className="docs-nav-container">
          <div className="docs-nav-tabs">
            <button 
              className={`docs-nav-tab ${activeTab === 'local' ? 'active' : ''}`}
              onClick={() => setActiveTab('local')}
            >
              Local Deployment
            </button>
            <button 
              className={`docs-nav-tab ${activeTab === 'cloud' ? 'active' : ''}`}
              onClick={() => setActiveTab('cloud')}
            >
              Cloud API
            </button>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarVisible ? '◀' : '▶'}
          </button>
        </div>
      </div>

      {/* Main Content Area - 保持结构不变 */}
      <div className="docs-content-wrapper">
        {/* 左侧边栏 - 固定不动 */}
        {isSidebarVisible && (
          <aside className="docs-sidebar">
            <nav className="sidebar-nav">
              <ul className="sidebar-menu">
                {currentNavItems.map(item => (
                  <li key={item.id} className="sidebar-menu-item">
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* 右侧内容区域 - 可滚动 */}
        <main className="docs-content" ref={contentRef}>
          <div className="docs-content-inner">
            {activeTab === 'local' ? (
              <>
                {/* Local Deployment Content */}
                <section id="overview" className="content-section">
                  <h2>Overview</h2>
                  <div className="content-text">
                    <p>
                      MemContext is dedicated to building a persistent, high-fidelity, evolvable, and cross-platform 
                      full-modal memory repository for AI Agents. Existing Agent Memory frameworks are mostly text-centric, 
                      often failing to preserve information from videos, audio, and documents in their original form.
                    </p>
                    <p>
                      Designed with a "Full-Modal Native" principle, MemContext provides end-to-end capabilities for 
                      video, audio, and document streams—from full-modal input and streaming storage to frame-level retrieval.
                    </p>
                  </div>
                </section>
                
                <section id="core-features" className="content-section">
                  <h2>Core Features</h2>
                  <div className="features-grid">
                    <div className="feature-card">
                      <div className="feature-icon">♾️</div>
                      <div className="feature-content">
                        <h3>Full-Modal Storage & Retrieval</h3>
                        <p className="feature-description">
                          Beyond the limits of Text-to-Text. Unified processing paradigm for heterogeneous data.
                        </p>
                        <ul className="feature-list">
                          <li>Unified processing of video, audio, images, documents, and text</li>
                          <li>Parallel retrieval workflow with direct vector indexes</li>
                          <li>Cross-modal retrieval capabilities</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🎞️</div>
                      <div className="feature-content">
                        <h3>Infinite Stream Processing</h3>
                        <p className="feature-description">
                          Forget the anxiety of limited context windows.
                        </p>
                        <ul className="feature-list">
                          <li>Designed for Long Context Data and 24/7 Continuous Operation</li>
                          <li>Supports ingestion of infinite-length media</li>
                          <li>Dynamic chunking with continuity checks</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🎯</div>
                      <div className="feature-content">
                        <h3>0.1s Spatiotemporal Precision</h3>
                        <p className="feature-description">
                          Stop hallucinating timestamps.
                        </p>
                        <ul className="feature-list">
                          <li>0.1-second accuracy for video/audio positioning</li>
                          <li>Frame-level retrieval precision</li>
                          <li>True "needle in a haystack" capability</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="feature-card">
                      <div className="feature-icon">🤖</div>
                      <div className="feature-content">
                        <h3>Seamless Multi-Platform Integration</h3>
                        <p className="feature-description">
                          Out-of-the-box compatibility with mainstream platforms.
                        </p>
                        <ul className="feature-list">
                          <li>n8n, Coze, MCP, and Claude Skills support</li>
                          <li>Plugin-based mechanism for workflows</li>
                          <li>Unified API via RESTful APIs or SDKs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="architecture" className="content-section">
                  <h2>Architecture</h2>
                  <div className="content-text">
                    <p>
                      MemContext draws inspiration from human cognitive processes and operating system storage structures, 
                      adopting a tiered storage architecture paired with a dual-retrieval engine.
                    </p>

                    <figure className="docs-figure">
                      <img
                        className="docs-image"
                        src="/images/memcontext-workflow.png"
                        alt="MemContext architecture workflow"
                        loading="lazy"
                      />
                      <figcaption className="docs-caption">
                      </figcaption>
                    </figure>
                    
                    <div className="architecture-diagram">
                      <div className="arch-step">
                        <div className="arch-step-number">01</div>
                        <div className="arch-step-content">
                          <h4>Multi-modal Input</h4>
                          <p>Unified processor extracts multi-dimensional features</p>
                        </div>
                      </div>
                      
                      <div className="arch-step">
                        <div className="arch-step-number">02</div>
                        <div className="arch-step-content">
                          <h4>STM (Short-Term Memory)</h4>
                          <p>Handles immediate context streams, Embedding calculations</p>
                        </div>
                      </div>
                      
                      <div className="arch-step">
                        <div className="arch-step-number">03</div>
                        <div className="arch-step-content">
                          <h4>MTM (Medium-Term Memory)</h4>
                          <p>Session-based buffer with Heat Calculation Algorithm</p>
                        </div>
                      </div>
                      
                      <div className="arch-step">
                        <div className="arch-step-number">04</div>
                        <div className="arch-step-content">
                          <h4>LTM (Long-Term Memory)</h4>
                          <p>High-heat information crystallizes into permanent storage</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="use-cases" className="content-section">
                  <h2>Use Cases</h2>
                  <div className="use-cases-grid">
                    <div className="use-case-card">
                      <div className="use-case-header">
                        <h3>Personalized AI Agent</h3>
                      </div>
                      <div className="use-case-content">
                        <p><strong>Pain Point:</strong> Current chatbots forget as soon as the chat ends.</p>
                        <p><strong>MemContext Solution:</strong> LTM evolves user profiles based on repeated preferences, providing context-aware responses across time cycles.</p>
                      </div>
                    </div>
                    
                    <div className="use-case-card">
                      <div className="use-case-header">
                        <h3>Integrated Brain for Long-Cycle Projects</h3>
                      </div>
                      <div className="use-case-content">
                        <p><strong>Pain Point:</strong> Early meeting recordings and current documentation are disconnected.</p>
                        <p><strong>MemContext Solution:</strong> MTM maintains heat for frequently accessed project information with cross-modal verification.</p>
                      </div>
                    </div>
                    
                    <div className="use-case-card">
                      <div className="use-case-header">
                        <h3>Companion Learning Tutor</h3>
                      </div>
                      <div className="use-case-content">
                        <p><strong>Pain Point:</strong> Traditional education AI doesn't know your learning curve.</p>
                        <p><strong>MemContext Solution:</strong> STM captures immediate learner confusion and associates with previously mastered concepts.</p>
                      </div>
                    </div>
                    
                    <div className="use-case-card">
                      <div className="use-case-header">
                        <h3>Smart Home "Butler Memory"</h3>
                      </div>
                      <div className="use-case-content">
                        <p><strong>Pain Point:</strong> Smart speakers only execute commands; they have no sense of family history.</p>
                        <p><strong>MemContext Solution:</strong> Episodic memory for family events with complex semantic positioning.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="prerequisites" className="content-section">
                  <h2>Prerequisites</h2>
                  <div className="prerequisites-grid">
                    <div className="prerequisite-card">
                      <div className="prerequisite-icon">🐍</div>
                      <div className="prerequisite-content">
                        <h4>Python 3.10+</h4>
                        <p>Required Python version for running MemContext</p>
                      </div>
                    </div>
                    
                    <div className="prerequisite-card">
                      <div className="prerequisite-icon">🔥</div>
                      <div className="prerequisite-content">
                        <h4>Flask ≥2.0.0, ＜3.0.0</h4>
                        <p>Web framework dependency for the demo application</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="quick-start" className="content-section">
                  <h2>Quick Start</h2>
                  
                  <div className="quick-start-steps">
                    <div className="step">
                      <div className="step-header">
                        <div className="step-number">1</div>
                        <h3>Create Python Virtual Environment</h3>
                      </div>
                      <div className="step-content">
                        <div className="code-block">
                          <code>conda create -n memcontext python=3.10 -y</code>
                        </div>
                        <div className="code-block">
                          <code>conda activate memcontext</code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="step">
                      <div className="step-header">
                        <div className="step-number">2</div>
                        <h3>Install Dependencies</h3>
                      </div>
                      <div className="step-content">
                        <div className="code-block">
                          <code>pip install -r requirements.txt</code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="step">
                      <div className="step-header">
                        <div className="step-number">3</div>
                        <h3>Configure Secrets</h3>
                      </div>
                      <div className="step-content">
                        <p>Create a <code>.env</code> file in the memdemo directory:</p>
                        <div className="code-block">
                          <pre>
                            <code>
{`# LLM API Configuration
LLM_API_KEY=YOUR-API-KEY
LLM_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
LLM_MODEL=doubao-seed-1-6-flash-250828

# Embedding API Configuration
EMBEDDING_API_KEY=YOUR-API-KEY
EMBEDDING_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
EMBEDDING_MODEL=doubao-embedding-large-text-250515

# SiliconFlow API Configuration
SILICONFLOW_API_KEY=YOUR-API-KEY
SILICONFLOW_MODEL=TeleAI/TeleSpeechASR

# Audio Transcription
ENABLE_AUDIO_TRANSCRIPTION=true`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="step">
                      <div className="step-header">
                        <div className="step-number">4</div>
                        <h3>Run the Demo</h3>
                      </div>
                      <div className="step-content">
                        <p><strong>Flask version:</strong></p>
                        <div className="code-block">
                          <code>cd memdemo</code>
                        </div>
                        <div className="code-block">
                          <code>python app.py    # Default port 5019</code>
                        </div>
                        
                        <p><strong>FastAPI version (requires Redis):</strong></p>
                        <div className="code-block">
                          <code>docker run -d --name memcontext-redis -p 6379:6379 redis:7-alpine</code>
                        </div>
                        <div className="code-block">
                          <code>cd memdemo</code>
                        </div>
                        <div className="code-block">
                          <code>python app_fastAPI.py   # Default port 5019</code>
                        </div>
                        
                        <p>Open <a href="http://localhost:5019/">http://localhost:5019/</a> in your browser to see the login interface.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="contributing" className="content-section">
                  <h2>Contributing</h2>
                  <div className="content-text">
                    <p>
                      The core functions of MemContext are currently under intensive development. 
                      If you are interested in Multi-modal Agent Memory systems, feel free to Star the repo and follow our progress.
                    </p>
                  </div>
                </section>
                
                <section id="license" className="content-section">
                  <h2>License</h2>
                  <div className="license-card">
                    <div className="license-header">
                      <h3>Apache 2.0</h3>
                    </div>
                    <div className="license-content">
                      <p>Open source license allowing permissive use, modification, and distribution.</p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <>
                {/* Cloud API Content */}
                <section id="api-overview" className="content-section">
                  <h2>API Overview</h2>
                  <div className="content-text">
                    <p>
                      MemContext provides a comprehensive RESTful API for managing multi-modal agent memories. 
                      All APIs require authentication via API keys and support JSON request/response formats.
                    </p>
                    
                    <div className="api-endpoints">
                      <div className="api-endpoint-card">
                        <div className="endpoint-header">
                          <span className="endpoint-method">POST</span>
                          <span className="endpoint-path">/add_memory</span>
                        </div>
                        <div className="endpoint-description">
                          <p>Write user input and agent response to memory system</p>
                        </div>
                      </div>
                      
                      <div className="api-endpoint-card">
                        <div className="endpoint-header">
                          <span className="endpoint-method">POST</span>
                          <span className="endpoint-path">/retrieve_memory</span>
                        </div>
                        <div className="endpoint-description">
                          <p>Retrieve memories from short, medium, and long-term storage</p>
                        </div>
                      </div>
                      
                      <div className="api-endpoint-card">
                        <div className="endpoint-header">
                          <span className="endpoint-method">POST</span>
                          <span className="endpoint-path">/get_user_profile</span>
                        </div>
                        <div className="endpoint-description">
                          <p>Get user profile with optional knowledge entries</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="api-base-url">
                      <h4>Base URL</h4>
                      <div className="code-block inline">
                        <code>https://memcontext.ai/mem_api</code>
                      </div>
                      <p className="note">Replace with your production deployment URL</p>
                    </div>
                  </div>
                </section>
                
                <section id="authentication" className="content-section">
                  <h2>Authentication</h2>
                  <div className="content-text">
                    <p>
                      All API requests must include an API key in the Authorization header. 
                      The project_id is automatically parsed from the API key and doesn't need to be included in the request body.
                    </p>
                    
                    <div className="auth-example">
                      <h4>Header Format</h4>
                      <div className="code-block">
                        <code>Authorization: Bearer sk_mem_YOUR_API_KEY_HERE</code>
                      </div>
                      <div className="note">
                        <p><strong>Note:</strong> API keys start with <code>sk_mem_</code> and each key corresponds to one project.</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="add-memory" className="content-section">
                  <h2>Add Memory API</h2>
                  <div className="api-detail">
                    <div className="api-method-header">
                      <span className="api-method">POST</span>
                      <span className="api-path">/add_memory</span>
                    </div>
                    <div className="api-description">
                      <p>Write a round of "user input + agent response" to the memory system.</p>
                    </div>
                    
                    <div className="api-parameters">
                      <h4>Request Parameters</h4>
                      <div className="params-table">
                        <div className="param-row">
                          <div className="param-name">user_input</div>
                          <div className="param-type">string</div>
                          <div className="param-required">Required</div>
                          <div className="param-desc">User input content</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">agent_response</div>
                          <div className="param-type">string</div>
                          <div className="param-required">Required</div>
                          <div className="param-desc">Agent response content</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">meta_data</div>
                          <div className="param-type">object</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Custom metadata (source, etc.)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="api-example">
                      <h4>Example Request</h4>
                      <div className="code-block">
                        <pre>
                          <code>
{`curl -X POST "http://localhost:5019/add_memory" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk_mem_YOUR_API_KEY_HERE" \\
  -d '{
    "user_input": "I like programming and AI",
    "agent_response": "Great to hear you're interested...",
    "meta_data": {}
  }'`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="retrieve-memory" className="content-section">
                  <h2>Retrieve Memory API</h2>
                  <div className="api-detail">
                    <div className="api-method-header">
                      <span className="api-method">POST</span>
                      <span className="api-path">/retrieve_memory</span>
                    </div>
                    <div className="api-description">
                      <p>Retrieve relevant context from memory for conversation or RAG scenarios.</p>
                    </div>
                    
                    <div className="api-parameters">
                      <h4>Request Parameters</h4>
                      <div className="params-table">
                        <div className="param-row">
                          <div className="param-name">query</div>
                          <div className="param-type">string</div>
                          <div className="param-required">Required</div>
                          <div className="param-desc">Search query text</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">relationship_with_user</div>
                          <div className="param-type">string</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Relationship style (default: "friend")</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">style_hint</div>
                          <div className="param-type">string</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Response style hint</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">max_results</div>
                          <div className="param-type">integer</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Max results per memory type (1-100)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="user-profile" className="content-section">
                  <h2>Get User Profile API</h2>
                  <div className="api-detail">
                    <div className="api-method-header">
                      <span className="api-method">POST</span>
                      <span className="api-path">/get_user_profile</span>
                    </div>
                    <div className="api-description">
                      <p>Get user's long-term profile and optional knowledge entries.</p>
                    </div>
                    
                    <div className="api-parameters">
                      <h4>Request Parameters</h4>
                      <div className="params-table">
                        <div className="param-row">
                          <div className="param-name">include_knowledge</div>
                          <div className="param-type">boolean</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Include user knowledge (default: true)</div>
                        </div>
                        <div className="param-row">
                          <div className="param-name">include_assistant_knowledge</div>
                          <div className="param-type">boolean</div>
                          <div className="param-required">Optional</div>
                          <div className="param-desc">Include assistant knowledge (default: false)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="error-handling" className="content-section">
                  <h2>Error Handling</h2>
                  <div className="content-text">
                    <p>APIs return standard HTTP status codes with JSON error details.</p>
                    
                    <div className="error-codes">
                      <div className="error-code">
                        <div className="error-status">400</div>
                        <div className="error-desc">Missing or invalid parameters</div>
                      </div>
                      <div className="error-code">
                        <div className="error-status">403</div>
                        <div className="error-desc">Invalid or expired API key</div>
                      </div>
                      <div className="error-code">
                        <div className="error-status">429</div>
                        <div className="error-desc">Rate limit exceeded</div>
                      </div>
                      <div className="error-code">
                        <div className="error-status">500</div>
                        <div className="error-desc">Server internal error</div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="rate-limiting" className="content-section">
                  <h2>Rate Limiting</h2>
                  <div className="content-text">
                    <p>API endpoints have the following rate limits:</p>
                    
                    <div className="rate-limits">
                      <div className="rate-limit">
                        <div className="rate-endpoint">/add_memory</div>
                        <div className="rate-value">10 requests per minute</div>
                      </div>
                      <div className="rate-limit">
                        <div className="rate-endpoint">/retrieve_memory</div>
                        <div className="rate-value">10 requests per minute</div>
                      </div>
                      <div className="rate-limit">
                        <div className="rate-endpoint">/get_user_profile</div>
                        <div className="rate-value">20 requests per minute</div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;