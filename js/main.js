// LINGZ 聆知AI - 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
  // ===== 全局变量 =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const form = document.getElementById('demoForm');
  
  // ===== 移动端导航菜单切换 =====
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
  
  // ===== 平滑滚动导航 =====
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // 关闭移动端菜单（如果打开）
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
          
          // 平滑滚动到目标位置
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // 更新活动导航链接
          updateActiveNavLink(targetId);
        }
      }
    });
  });
  
  // ===== 滚动时更新活动导航链接 =====
  function updateActiveNavLink(id) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === id) {
        link.classList.add('active');
      }
    });
  }
  
  // ===== 监听滚动，更新活动导航链接和添加滚动效果 =====
  window.addEventListener('scroll', function() {
    // 更新导航链接
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 100) {
        current = '#' + section.getAttribute('id');
      }
    });
    
    if (current) {
      updateActiveNavLink(current);
    }
    
    // 添加滚动动画
    animateOnScroll();
  });
  
  // ===== 表单提交处理 =====
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 收集表单数据
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      
      // 简单验证
      if (!formDataObject.name || !formDataObject.tel || !formDataObject.email || !formDataObject.industry) {
        showNotification('请填写所有必填项', 'error');
        return;
      }
      
      // 模拟提交成功
      showNotification('演示预约已提交！我们的销售代表将在24小时内联系您。', 'success');
      form.reset();
      
      // 在实际应用中，这里会发送到后端API
      console.log('Form submitted:', formDataObject);
    });
  }
  
  // ===== 显示通知 =====
  function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${getNotificationColor(type)};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 300px;
      max-width: 400px;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 10000;
    `;
    
    // 显示通知
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
    
    // 自动关闭（成功消息7秒，错误消息10秒）
    const autoCloseTime = type === 'success' ? 7000 : 10000;
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, autoCloseTime);
  }
  
  function getNotificationIcon(type) {
    switch(type) {
      case 'success': return 'check-circle';
      case 'error': return 'exclamation-circle';
      case 'warning': return 'exclamation-triangle';
      default: return 'info-circle';
    }
  }
  
  function getNotificationColor(type) {
    switch(type) {
      case 'success': return '#34C759';
      case 'error': return '#FF3B30';
      case 'warning': return '#FF9F0A';
      default: return '#000000';
    }
  }
  
  // ===== 滚动动画 =====
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // 当元素进入视口时添加动画
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
        if (element.classList.contains('fade-in')) {
          element.style.animationDelay = (Math.random() * 0.3) + 's';
          element.classList.add('animated');
        } else if (element.classList.contains('slide-in-left')) {
          element.style.animationDelay = (Math.random() * 0.3) + 's';
          element.classList.add('animated');
        } else if (element.classList.contains('slide-in-right')) {
          element.style.animationDelay = (Math.random() * 0.3) + 's';
          element.classList.add('animated');
        }
      }
    });
  }
  
  // 初始化滚动动画
  animateOnScroll();
  
  // ===== 统计数据动画 =====
  function animateStats() {
    const stats = document.querySelectorAll('.audience-stats strong');
    
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 20;
      const intervalTime = 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, intervalTime);
    });
  }
  
  // 当统计数据进入视口时触发动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const audienceSection = document.querySelector('.audience-section');
  if (audienceSection) {
    observer.observe(audienceSection);
  }
  
  // ===== 模拟设备屏幕数据更新 =====
  function updateDeviceScreen() {
    const metricValues = document.querySelectorAll('.metric-value');
    const metrics = [
      { value: 87, label: '信任度建立', color: '#34C759' },
      { value: 92, label: '成交信号识别', color: '#34C759' },
      { value: 78, label: '表达优化空间', color: '#FF9F0A' },
      { value: 95, label: '客户画像完整度', color: '#34C759' }
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
      const currentMetric = metrics[currentIndex];
      const currentValue = metricValues[0];
      const currentLabel = document.querySelector('.metric-label');
      
      if (currentValue && currentLabel) {
        // 数值动画
        let count = parseInt(currentValue.textContent);
        const target = currentMetric.value;
        const step = Math.abs(target - count) / 10;
        
        const updateValue = () => {
          if (count < target) {
            count += step;
            if (count >= target) count = target;
          } else if (count > target) {
            count -= step;
            if (count <= target) count = target;
          }
          
          currentValue.textContent = Math.floor(count) + '%';
          currentValue.style.color = currentMetric.color;
          currentLabel.textContent = currentMetric.label;
          
          if (Math.abs(count - target) > 1) {
            setTimeout(updateValue, 50);
          }
        };
        
        updateValue();
      }
      
      currentIndex = (currentIndex + 1) % metrics.length;
    }, 3000);
  }
  
  // 启动设备屏幕动画
  setTimeout(updateDeviceScreen, 1000);
  
  // ===== 键盘快捷键 =====
  document.addEventListener('keydown', function(e) {
    // ESC键关闭导航菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // /键聚焦到搜索（如果有搜索功能）
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      // 如果有搜索输入框，可以在这里聚焦
    }
  });
  
  // ===== 性能优化：懒加载图片 =====
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(image => imageObserver.observe(image));
  } else {
    // 回退方案：直接加载所有图片
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }
  
  // ===== 预加载关键资源 =====
  function preloadCriticalResources() {
    // 预加载字体
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
    
    // 预加载图标
    const iconLink = document.createElement('link');
    iconLink.rel = 'preload';
    iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    iconLink.as = 'style';
    document.head.appendChild(iconLink);
  }
  
  preloadCriticalResources();
  
  // ===== 页面加载完成后的初始化 =====
  console.log('LINGZ 聆知AI 官网已加载完毕！🎯');
  
  // 显示页面加载完成动画
  document.body.classList.add('loaded');
});

// ===== 图片自动检测和加载功能 =====
(function() {
  // 在DOM完全加载后初始化
  setTimeout(() => {
    const productImage = document.getElementById('product-real-image');
    const imagePlaceholder = document.getElementById('product-image-placeholder');
    
    if (!productImage || !imagePlaceholder) return;
    
    console.log('🔄 正在检测产品图片文件...');
    
    // 创建CSS动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes placeholderPulse {
        0% { border-color: rgba(0, 122, 255, 0.2); }
        50% { border-color: rgba(0, 122, 255, 0.4); }
        100% { border-color: rgba(0, 122, 255, 0.2); }
      }
      
      .placeholder-pulse {
        animation: placeholderPulse 2s infinite ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .image-placeholder.loading {
        position: relative;
        pointer-events: none;
      }
      
      .image-placeholder.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        border: 3px solid rgba(0, 122, 255, 0.1);
        border-top-color: var(--brand-accent);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        transform: translate(-50%, -50%);
      }
      
      @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      .btn-small {
        font-size: 0.875rem !important;
        padding: 8px 16px !important;
        border-radius: 8px !important;
      }
    `;
    document.head.appendChild(style);
    
    // 简化图片检测逻辑
    function checkImageExists() {
      console.log('🔄 检测产品图片:', productImage.src);
      
      // 直接检查图片是否已经加载成功
      if (productImage.complete && productImage.naturalHeight !== 0) {
        console.log('✅ 产品图片已加载完毕');
        // 图片已经加载成功，隐藏占位符
        imagePlaceholder.style.display = 'none';
        productImage.style.display = 'block';
        return;
      }
      
      // 如果图片还没加载完成，测试加载
      const testImage = new Image();
      testImage.src = productImage.src;
      
      testImage.onload = function() {
        console.log('✅ 产品图片测试加载成功');
        // 确保主图片正确显示
        productImage.style.display = 'block';
        imagePlaceholder.style.display = 'none';
      };
      
      testImage.onerror = function() {
        console.warn('❌ 产品图片加载失败');
        // 显示占位符
        productImage.style.display = 'none';
        imagePlaceholder.style.display = 'block';
        imagePlaceholder.classList.add('placeholder-pulse');
        
        // 添加调试信息
        const hint = imagePlaceholder.querySelector('.image-hint') || document.createElement('div');
        hint.className = 'image-hint';
        hint.innerHTML = '路径: ' + productImage.src;
        hint.style.cssText = 'margin-top: 12px; padding: 8px; background: rgba(255, 59, 48, 0.1); border-radius: 6px; border: 1px dashed #FF3B30; font-size: 0.8rem; color: #FF3B30;';
        
        if (!imagePlaceholder.contains(hint)) {
          imagePlaceholder.appendChild(hint);
        }
      };
    }
    
    
    
    // 添加上传按钮（模拟上传功能）
    const uploadBtn = document.createElement('button');
    uploadBtn.type = 'button';
    uploadBtn.className = 'btn btn-outline btn-small';
    uploadBtn.style.cssText = 'margin-top: 16px; font-size: 0.875rem; padding: 8px 16px;';
    uploadBtn.innerHTML = '<i class="fas fa-upload"></i> 强制显示真实图片';
    uploadBtn.onclick = function() {
      console.log('🔄 强制触发图片显示...');
      
      // 模拟图片加载效果
      imagePlaceholder.classList.add('loading');
      
      setTimeout(() => {
        imagePlaceholder.style.display = 'none';
        productImage.style.display = 'block';
        productImage.style.opacity = '0';
        productImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          productImage.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          productImage.style.opacity = '1';
          productImage.style.transform = 'scale(1)';
          
          console.log('✅ 强制显示产品图片成功');
          showSuccessStatus();
        }, 100);
      }, 800);
    };
    
    // 添加模拟按钮到占位符
    if (!imagePlaceholder.querySelector('.btn-outline')) {
      imagePlaceholder.appendChild(uploadBtn);
    }
    
    // 初始检查 - 页面加载后立即执行
    window.addEventListener('load', function() {
      console.log('📄 页面完全加载，检查图片...');
      checkImageExists();
    });
    
    // DOM加载完成后也检查一次
    document.addEventListener('DOMContentLoaded', function() {
      console.log('⚡ DOM加载完成，检查图片...');
      setTimeout(checkImageExists, 300);
    });
    
    // 初始化图片轮播和预览功能
    initImageSlider();
  }, 2000); // 延迟2秒确保DOM完全加载
})();

// ===== 图片轮播和放大预览功能 =====
function initImageSlider() {
  console.log('🖼️ 初始化图片轮播和预览功能...');
  
  // 创建图片预览模态框
  const modalHTML = `
    <div class="image-modal" id="imageModal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>产品细节预览</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="slider-container">
            <div class="slider-track" id="sliderTrack">
              <!-- 轮播图片将通过JavaScript动态添加 -->
            </div>
            <button class="slider-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="slider-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            <div class="slider-dots" id="sliderDots"></div>
          </div>
          <div class="image-info">
            <h4 id="currentImageTitle">聆知AI产品细节</h4>
            <p id="currentImageDesc">点击图片可以切换下一张，点击右上角×关闭预览</p>
            <div class="image-actions">
              <button class="btn btn-small" id="zoomInBtn"><i class="fas fa-search-plus"></i> 放大</button>
              <button class="btn btn-small" id="zoomOutBtn"><i class="fas fa-search-minus"></i> 缩小</button>
              <button class="btn btn-small" id="resetZoomBtn"><i class="fas fa-sync-alt"></i> 重置</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 添加模态框到页面
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);
  
  // 创建CSS样式
  const style = document.createElement('style');
  style.textContent = `
    .image-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    }
    
    .modal-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
    }
    
    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 1000px;
      max-height: 80vh;
      background: var(--bg-surface);
      border-radius: 24px;
      box-shadow: 0 20px 80px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.95);
    }
    
    .modal-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--text-primary);
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 28px;
      color: var(--text-tertiary);
      cursor: pointer;
      line-height: 1;
      padding: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .modal-close:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }
    
    .modal-body {
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 24px;
      flex: 1;
      overflow: hidden;
    }
    
    .slider-container {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: linear-gradient(135deg, #f8f8f9 0%, #ffffff 100%);
    }
    
    .slider-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      height: 360px;
    }
    
    .slider-track img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      flex-shrink: 0;
      transition: transform 0.3s ease;
      cursor: zoom-in;
    }
    
    .slider-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--text-primary);
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease;
      z-index: 2;
    }
    
    .slider-btn:hover {
      background: white;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      transform: translateY(-50%) scale(1.05);
    }
    
    .prev-btn {
      left: 16px;
    }
    
    .next-btn {
      right: 16px;
    }
    
    .slider-dots {
      position: absolute;
      bottom: 16px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      z-index: 2;
    }
    
    .slider-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      padding: 0;
      transition: all 0.2s ease;
    }
    
    .slider-dot.active {
      background: white;
      transform: scale(1.2);
    }
    
    .image-info {
      padding: 16px;
      background: var(--bg-tertiary);
      border-radius: 12px;
      overflow-y: auto;
    }
    
    .image-info h4 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 1.125rem;
    }
    
    .image-info p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }
    
    .image-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .btn-small {
      font-size: 0.875rem !important;
      padding: 8px 16px !important;
      border-radius: 8px !important;
      width: 100%;
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      .modal-body {
        grid-template-columns: 1fr;
      }
      
      .slider-track {
        height: 260px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // 轮播数据 - 从外部JSON文件加载产品素材图片
  let slides = null; // 初始设为null，将在加载JSON后赋值
  let slidesLoaded = false; // 标记JSON是否已加载
  
  const modal = document.getElementById('imageModal');
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const currentImageTitle = document.getElementById('currentImageTitle');
  const currentImageDesc = document.getElementById('currentImageDesc');
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  
  let slides = null; // 图片数据数组
  let currentSlide = 0; // 滑块当前位置
  let zoomLevel = 1;
  
  // 加载JSON数据
  async function loadSlidesData() {
    try {
      const response = await fetch('js/slides.json');
      if (!response.ok) {
        throw new Error(`加载失败: ${response.status}`);
      }
      slides = await response.json();
      return slides;
    } catch (error) {
      console.error('加载slides.json失败:', error);
      // 如果JSON加载失败，使用默认数据作为回退
      slides = [
        {
          src: 'images/详情_02.jpg',
          title: '智能AI引擎录音笔 - 产品正面',
          description: 'LINGZ FW920 AI智能录音卡正面设计，0.315cm极致轻薄，32g超轻重量，银色金属质感。'
        },
        {
          src: 'images/详情_03.jpg',
          title: '智能翻译功能展示',
          description: '118国语言实时翻译功能，AI智能翻译技术，支持多语言实时转写。'
        },
        {
          src: 'images/详情_04.jpg',
          title: 'AI转写核心能力',
          description: '专业级语音转文字技术，准确率高达98%，支持实时字幕生成。'
        },
        {
          src: 'images/详情_05.jpg',
          title: '智能总结功能',
          description: 'ChatGPT4赋能，自动生成会议纪要、学习笔记、采访总结。'
        },
        {
          src: 'images/详情_06.jpg',
          title: '产品技术参数',
          description: '400mAh聚合物电池，36小时超长录音，0.315cm厚度，32g重量。'
        },
        {
          src: 'images/详情_07.jpg',
          title: '多设备连接',
          description: '蓝牙5.3技术，同时连接手机、平板、电脑多设备，数据同步无延迟。'
        },
        {
          src: 'images/详情_08.jpg',
          title: '会议应用场景',
          description: '商务会议场景展示，支持多人会议录音，AI自动角色识别和内容整理。'
        },
        {
          src: 'images/详情_09.jpg',
          title: '教育学习应用',
          description: '课堂讲座、培训课程记录，实时生成学习笔记和知识框架。'
        },
        {
          src: 'images/详情_10.jpg',
          title: '媒体采访场景',
          description: '专业采访录音，实时语音转文字，自动生成采访稿件。'
        },
        {
          src: 'images/详情_11.jpg',
          title: '灵感记录功能',
          description: '随时记录灵感，AI智能整理思路，生成结构化内容框架。'
        },
        {
          src: 'images/详情_12.jpg',
          title: '产品包装展示',
          description: 'LINGZ FW920专业包装设计，包含录音笔、充电线、说明书等全套配件。'
        },
        {
          src: 'images/详情_13.jpg',
          title: '使用界面演示',
          description: '简洁易用的操作界面，手机APP配合使用，功能一目了然。'
        },
        {
          src: 'images/详情_14.jpg',
          title: '多场景对比展示',
          description: '对比展示不同应用场景下的使用效果，突显产品多功能性。'
        },
        {
          src: 'images/详情_15.jpg',
          title: '技术架构原理',
          description: '6D立体麦克风阵列技术，AI智能芯片架构，高性能录音处理能力。'
        }
      ];
      return slides;
    }
  }

  // 初始化轮播内容
  async function initSlides() {
    try {
      // 第一步：加载数据
      if (!slides) {
        await loadSlidesData();
      }
      
      // 第二步：清空现有内容
      sliderTrack.innerHTML = '';
      sliderDots.innerHTML = '';
      
      // 第三步：根据数据创建幻灯片
      slides.forEach((slide, index) => {
        // 添加图片到轨道
        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.title;
        img.className = 'slide-image';
        img.dataset.index = index;
        sliderTrack.appendChild(img);
        
        // 添加指示点
        const dot = document.createElement('button');
        dot.className = index === 0 ? 'slider-dot active' : 'slider-dot';
        dot.dataset.index = index;
        sliderDots.appendChild(dot);
      });
      
      // 第四步：更新当前显示的幻灯片
      updateActiveSlide();
    } catch (error) {
      console.error('初始化幻灯片失败:', error);
    }
  }
  
  // 更新当前激活的幻灯片
  function updateActiveSlide() {
    // 检查数据是否已加载
    if (!slides || slides.length === 0) {
      console.warn('幻灯片数据未加载或为空');
      return;
    }
    
    // 确保当前幻灯片索引在有效范围内
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= slides.length) currentSlide = slides.length - 1;
    
    const trackWidth = sliderTrack.clientWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * trackWidth}px)`;
    
    // 更新指示点
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
      dot.className = index === currentSlide ? 'slider-dot active' : 'slider-dot';
    });
    
    // 更新信息
    currentImageTitle.textContent = slides[currentSlide].title;
    currentImageDesc.textContent = slides[currentSlide].description;
    
    // 重置缩放
    zoomLevel = 1;
    updateImageZoom();
  }
  
  // 更新图片缩放
  function updateImageZoom() {
    const currentImage = document.querySelector('.slide-image[data-index="' + currentSlide + '"]');
    if (currentImage) {
      currentImage.style.transform = `scale(${zoomLevel})`;
    }
  }
  
  // 事件监听器 - 添加性能优化同步
  prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateActiveSlide();
    // 同步到性能优化系统
    if (typeof lazySlideIndex !== 'undefined') {
      lazySlideIndex = currentSlide;
    }
  });
  
  nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateActiveSlide();
    // 同步到性能优化系统
    if (typeof lazySlideIndex !== 'undefined') {
      lazySlideIndex = currentSlide;
    }
  });
  
  // 指示点点击
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider-dot')) {
      currentSlide = parseInt(e.target.dataset.index);
      updateActiveSlide();
      // 同步到性能优化系统
      if (typeof lazySlideIndex !== 'undefined') {
        lazySlideIndex = currentSlide;
      }
    }
  });
  
  // 图片点击下一张
  sliderTrack.addEventListener('click', (e) => {
    if (e.target.classList.contains('slide-image')) {
      currentSlide = (currentSlide + 1) % slides.length;
      updateActiveSlide();
      // 同步到性能优化系统
      if (typeof lazySlideIndex !== 'undefined') {
        lazySlideIndex = currentSlide;
      }
    }
  });
  
  // 缩放功能
  zoomInBtn?.addEventListener('click', () => {
    if (zoomLevel < 3) {
      zoomLevel = Math.min(zoomLevel + 0.25, 3);
      updateImageZoom();
    }
  });
  
  zoomOutBtn?.addEventListener('click', () => {
    if (zoomLevel > 0.5) {
      zoomLevel = Math.max(zoomLevel - 0.25, 0.5);
      updateImageZoom();
    }
  });
  
  resetZoomBtn?.addEventListener('click', () => {
    zoomLevel = 1;
    updateImageZoom();
  });
  
  // 键盘控制
  document.addEventListener('keydown', (e) => {
    if (!modal.style.display || modal.style.display === 'none') return;
    
    switch(e.key) {
      case 'Escape':
        modal.style.display = 'none';
        break;
      case 'ArrowLeft':
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateActiveSlide();
        break;
      case 'ArrowRight':
        currentSlide = (currentSlide + 1) % slides.length;
        updateActiveSlide();
        break;
      case '+':
      case '=':
        e.preventDefault();
        if (zoomLevel < 3) {
          zoomLevel = Math.min(zoomLevel + 0.25, 3);
          updateImageZoom();
        }
        break;
      case '-':
        e.preventDefault();
        if (zoomLevel > 0.5) {
          zoomLevel = Math.max(zoomLevel - 0.25, 0.5);
          updateImageZoom();
        }
        break;
    }
  });
  
  // 关闭按钮
  closeBtn?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // 点击遮罩层关闭
  modal.querySelector('.modal-overlay')?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // 自动显示产品图片预览（移除点击事件）
  const productImage = document.querySelector('.product-image');
  if (productImage) {
    // 移除鼠标指针样式，因为不再需要点击
    productImage.style.cursor = 'default';
  }
  
  // 创建直接嵌入页面的轮播组件（页面加载后自动显示）
  function createDirectCarousel() {
    console.log('🎨 创建直接嵌入的产品轮播组件...');
    
    const productShowcase = document.querySelector('.product-showcase');
    if (!productShowcase) {
      console.warn('⚠️ 未找到产品展示区域，无法创建轮播组件');
      return;
    }
    
    // 创建轮播HTML结构
    const carouselHTML = `
    <div class="direct-product-carousel" id="directProductCarousel">
      <div class="carousel-content">
        <div class="carousel-header">
          <h3>产品细节展示 <span class="carousel-counter">1/14</span></h3>
          <p class="carousel-subtitle">14张高清产品图片自动轮播，全方位展示LINGZ FW920</p>
        </div>
        
        <div class="carousel-container">
          <div class="direct-image-track" id="directImageTrack">
            <!-- 图片将通过JS动态插入 -->
          </div>
          
          <div class="carousel-nav">
            <button class="nav-btn prev-direct-btn" aria-label="上一张">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="nav-btn next-direct-btn" aria-label="下一张">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="carousel-dots" id="directCarouselDots"></div>
          
          <div class="carousel-info">
            <h4 id="directCarouselTitle">智能AI引擎录音笔 - 产品正面</h4>
            <p id="directCarouselDesc">LINGZ FW920 AI智能录音卡正面设计，0.315cm极致轻薄，32g超轻重量，银色金属质感。</p>
          </div>
        </div>
      </div>
    </div>
    `;
    
    // 插入到产品展示区域后面
    productShowcase.insertAdjacentHTML('afterend', carouselHTML);
    
    // 添加CSS样式
    const carouselStyle = document.createElement('style');
    carouselStyle.textContent = `
      .direct-product-carousel {
        margin-top: 48px;
        margin-bottom: 32px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding-top: 32px;
      }
      
      .carousel-content {
        background: rgba(0, 122, 255, 0.02);
        border-radius: 20px;
        padding: 32px;
        border: 1px solid rgba(0, 122, 255, 0.08);
      }
      
      .carousel-header {
        margin-bottom: 24px;
      }
      
      .carousel-header h3 {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--text-primary);
      }
      
      .carousel-counter {
        background: var(--brand-accent);
        color: white;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 4px 12px;
        border-radius: 12px;
        margin-left: 8px;
      }
      
      .carousel-subtitle {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin: 0;
      }
      
      .carousel-container {
        position: relative;
      }
      
      .direct-image-track {
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        border-radius: 16px;
        background: var(--surface-secondary);
        margin-bottom: 24px;
        transition: all 0.3s ease;
      }
      
      .carousel-nav {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 24px;
      }
      
      .nav-btn {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: white;
        border: 2px solid rgba(0, 122, 255, 0.15);
        color: var(--brand-accent);
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .nav-btn:hover {
        background: var(--brand-accent);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 122, 255, 0.25);
      }
      
      .carousel-dots {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 28px;
      }
      
      .carousel-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(0, 122, 255, 0.2);
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
      }
      
      .carousel-dot.active {
        background: var(--brand-accent);
        width: 30px;
        border-radius: 8px;
      }
      
      .carousel-info {
        text-align: center;
        padding: 20px;
        background: rgba(0, 122, 255, 0.04);
        border-radius: 12px;
        border: 1px solid rgba(0, 122, 255, 0.08);
      }
      
      .carousel-info h4 {
        font-size: 1.15rem;
        font-weight: 600;
        margin: 0 0 12px 0;
        color: var(--text-primary);
      }
      
      .carousel-info p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
      }
      
      /* 响应式设计 */
      @media (max-width: 1024px) {
        .direct-image-track {
          height: 320px;
        }
        
        .nav-btn {
          width: 50px;
          height: 50px;
          font-size: 1.25rem;
        }
      }
      
      @media (max-width: 768px) {
        .direct-product-carousel {
          margin-top: 32px;
          padding-top: 24px;
        }
        
        .carousel-content {
          padding: 24px;
        }
        
        .direct-image-track {
          height: 280px;
        }
        
        .carousel-header h3 {
          font-size: 1.15rem;
        }
      }
      
      @media (max-width: 480px) {
        .direct-image-track {
          height: 220px;
        }
        
        .carousel-content {
          padding: 20px;
        }
        
        .nav-btn {
          width: 44px;
          height: 44px;
          font-size: 1.1rem;
        }
        
        .carousel-header h3 {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        }
      }
      
      img.carousel-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform 0.5s ease;
        border-radius: 8px;
      }
      
      .loading-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: var(--text-tertiary);
        font-size: 0.9rem;
      }
      
      .auto-play-indicator {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 0.75rem;
        z-index: 10;
      }
    `;
    
    document.head.appendChild(carouselStyle);
    
    console.log('✅ 直接轮播组件HTML和CSS已创建完成');
    initDirectCarousel();
  }
  
  // 初始化直接轮播组件
  function initDirectCarousel() {
    console.log('🔄 初始化直接轮播组件...');
    
    const track = document.getElementById('directImageTrack');
    const dotsContainer = document.getElementById('directCarouselDots');
    const titleEl = document.getElementById('directCarouselTitle');
    const descEl = document.getElementById('directCarouselDesc');
    const counterEl = document.querySelector('.carousel-counter');
    
    if (!track || !dotsContainer || !titleEl || !descEl || !counterEl) {
      console.warn('⚠️ 轮播组件DOM元素未找到，初始化失败');
      return;
    }
    
    // 清空现有内容
    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // 添加图片和指示点
    slides.forEach((slide, index) => {
      // 添加图片
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.title;
      img.className = 'carousel-image';
      img.style.display = index === 0 ? 'block' : 'none';
      
      // 检查图片是否加载成功
      img.onload = function() {
        console.log(`✅ 图片 ${index + 1} 加载成功: ${slide.title}`);
      };
      
      img.onerror = function() {
        console.warn(`❌ 图片 ${index + 1} 加载失败: ${slide.src}`);
        const fallback = this.parentElement.querySelector('.loading-image');
        if (fallback) {
          fallback.textContent = '图片加载失败，请检查文件路径';
          fallback.style.color = '#FF3B30';
        }
      };
      
      const slideContainer = document.createElement('div');
      slideContainer.className = 'slide-container';
      slideContainer.style.position = 'relative';
      
      // 添加加载提示
      const loading = document.createElement('div');
      loading.className = 'loading-image';
      loading.textContent = '加载中...';
      
      slideContainer.appendChild(loading);
      slideContainer.appendChild(img);
      track.appendChild(slideContainer);
      
      // 添加指示点
      const dot = document.createElement('button');
      dot.className = index === 0 ? 'carousel-dot active' : 'carousel-dot';
      dot.dataset.index = index;
      dot.ariaLabel = `切换到图片 ${index + 1}: ${slide.title}`;
      dotsContainer.appendChild(dot);
    });
    
    // 轮播状态
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // 更新显示的图片
    function updateSlide() {
      // 隐藏所有图片
      document.querySelectorAll('#directImageTrack .slide-container').forEach((container, idx) => {
        container.style.display = idx === currentIndex ? 'block' : 'none';
      });
      
      // 更新指示点
      document.querySelectorAll('#directCarouselDots .carousel-dot').forEach((dot, idx) => {
        dot.className = idx === currentIndex ? 'carousel-dot active' : 'carousel-dot';
      });
      
      // 更新标题和描述
      titleEl.textContent = slides[currentIndex].title;
      descEl.textContent = slides[currentIndex].description;
      
      // 更新计数器
      counterEl.textContent = `${currentIndex + 1}/${totalSlides}`;
      
      console.log(`📱 轮播切换到第 ${currentIndex + 1} 张: ${slides[currentIndex].title}`);
    }
    
    // 导航按钮事件
    document.querySelector('.prev-direct-btn')?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
      resetAutoPlay();
    });
    
    document.querySelector('.next-direct-btn')?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
      resetAutoPlay();
    });
    
    // 指示点点击事件
    document.querySelectorAll('#directCarouselDots .carousel-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        currentIndex = parseInt(e.target.dataset.index);
        updateSlide();
        resetAutoPlay();
      });
    });
    
    // 自动播放功能
    let autoPlayInterval;
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
      }, 2000); // 每2秒自动切换
    }
    
    function resetAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      startAutoPlay();
    }
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
        resetAutoPlay();
      }
    });
    
    // 初始显示
    updateSlide();
    startAutoPlay();
    
    // 添加自动播放提示
    const indicator = document.createElement('div');
    indicator.className = 'auto-play-indicator';
    indicator.innerHTML = '<i class="fas fa-sync-alt"></i> 自动轮播';
    track.appendChild(indicator);
    
    console.log('✅ 直接轮播组件初始化完成，开始自动轮播');
  }
  
  // 页面加载完成后创建直接轮播
  window.addEventListener('load', function() {
    console.log('🚀 页面加载完成，开始初始化直接轮播...');
    
    setTimeout(() => {
      createDirectCarousel();
      
      // 确保图片检测系统正常工作
      const productImage = document.getElementById('product-real-image');
      if (productImage) {
        console.log('🔄 等待图片检测系统加载...');
        // 图片检测会在之前的代码中自动执行
      }
    }, 800); // 短暂延迟确保所有DOM元素已就绪
  });
  
  console.log('✅ 图片轮播和预览功能已初始化完成');
  
  // ===== 图片性能优化 =====
  function optimizeImagePerformance() {
    console.log('🔄 正在优化图片加载性能...');
    
    // 1. 计算最佳图片尺寸
    function getOptimalImageSize(originalWidth, originalHeight) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (viewportWidth <= 768) { // 手机
        return { width: Math.min(originalWidth, 800), height: Math.min(originalHeight, 600) };
      } else if (viewportWidth <= 1200) { // 平板
        return { width: Math.min(originalWidth, 1200), height: Math.min(originalHeight, 900) };
      } else { // 桌面
        return { width: Math.min(originalWidth, 1600), height: Math.min(originalHeight, 1200) };
      }
    }
    
    // 2. 图片缓存系统
    const imageCache = {};
    
    // 3. 预加载前3张图片
    slides.slice(0, 3).forEach((slide, index) => {
      setTimeout(() => {
        const img = new Image();
        img.src = slide.src;
        img.loading = 'eager';
        img.decoding = 'async';
        img.onload = function() {
          console.log(`📦 已预加载图片 ${index + 1}: ${slide.title}`);
          imageCache[slide.src] = img;
        };
      }, index * 300); // 分批预加载，避免同时请求过多
    });
    
    // 4. 智能懒加载系统（与滑块同步）
    let lazySlideIndex = currentSlide || 0;
    const viewportPadding = 2;
    
    function lazyLoadImages() {
      const startIndex = Math.max(0, lazySlideIndex - viewportPadding);
      const endIndex = Math.min(slides.length - 1, lazySlideIndex + viewportPadding);
      
      for (let i = startIndex; i <= endIndex; i++) {
        const slide = slides[i];
        if (slide && !slide.loaded && !imageCache[slide.src]) {
          setTimeout(() => {
            const img = new Image();
            img.src = slide.src;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.onload = function() {
              slide.loaded = true;
              imageCache[slide.src] = img;
              console.log(`🖼️ 已智能加载: ${slide.title}`);
            };
          }, Math.abs(i - lazySlideIndex) * 200); // 按距离当前图片远近分批加载
        }
      }
    }
    
    // 5. 自适应图片质量
    function adaptImageQuality() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      let quality = 'normal';
      
      if (connection) {
        if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          quality = 'low';
        } else if (connection.effectiveType === '3g') {
          quality = 'medium';
        } else {
          quality = 'high';
        }
      }
      
      // 这里可以添加图片质量切换逻辑
      console.log(`🌐 网络连接质量检测: ${connection ? connection.effectiveType : 'unknown'}，采用${quality}质量图片`);
      return quality;
    }
    
    // 6. 清除大图片缓存
    function clearUnusedCache() {
      const usedKeys = new Set();
      for (let i = Math.max(0, lazySlideIndex - viewportPadding); 
           i <= Math.min(slides.length - 1, lazySlideIndex + viewportPadding); i++) {
        usedKeys.add(slides[i].src);
      }
      
      Object.keys(imageCache).forEach(key => {
        if (!usedKeys.has(key)) {
          delete imageCache[key];
        }
      });
    }
    
    // 7. 实时监听滑块位置变化，自动触发懒加载和缓存清理
    let lastKnownSlide = lazySlideIndex;
    
    function checkSlideChange() {
      if (currentSlide !== lazySlideIndex) {
        lazySlideIndex = currentSlide;
        console.log(`📱 滑块位置变化: ${lastKnownSlide} -> ${lazySlideIndex}`);
        lazyLoadImages();
        clearUnusedCache();
        lastKnownSlide = lazySlideIndex;
      }
    }
    
    // 定期检查滑块位置变化
    setInterval(checkSlideChange, 100);
    
    // 8. 监听窗口大小变化
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        console.log('🔄 窗口大小变化，重新调整图片策略');
        adaptImageQuality();
      }, 500);
    });
    
    // 9. 监控网络连接变化
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', adaptImageQuality);
    }
    
    // 初始加载网络质量检测和懒加载
    adaptImageQuality();
    lazyLoadImages();
    
    console.log('✅ 图片性能优化已完成');
  }
  
  // 延迟执行图片性能优化
  setTimeout(optimizeImagePerformance, 1000);
}

// ===== 性能监控 =====
window.addEventListener('load', function() {
  // 监控页面加载性能
  if ('performance' in window) {
    const perfData = window.performance.getEntriesByType('navigation')[0];
    if (perfData) {
      console.log('页面加载时间:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
      console.log('DOM交互时间:', perfData.domInteractive - perfData.fetchStart, 'ms');
    }
  }
  
  // 监控用户交互
  const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart'];
  let userInteracted = false;
  
  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, () => {
      if (!userInteracted) {
        userInteracted = true;
        console.log('用户开始与页面交互');
      }
    }, { once: true });
  });
});

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
  console.error('页面错误:', e.message, 'at', e.filename, 'line', e.lineno);
  // 在实际应用中，这里可以将错误发送到监控服务
}, true);

// ===== 离线支持 =====
window.addEventListener('online', function() {
  showNotification('网络连接已恢复', 'success');
});

window.addEventListener('offline', function() {
  showNotification('网络连接已断开，部分功能可能受限', 'warning');
});