document.addEventListener('DOMContentLoaded', function() {
    // 设置初始语言
    const htmlElement = document.documentElement;
    htmlElement.lang = 'zh';
    
    // 平滑滚动导航
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 语言切换功能
    const zhBtn = document.getElementById('zh-btn');
    const enBtn = document.getElementById('en-btn');
    
    if (zhBtn && enBtn) {
        zhBtn.addEventListener('click', function() {
            htmlElement.lang = 'zh';
            zhBtn.classList.add('active');
            enBtn.classList.remove('active');
        });
        
        enBtn.addEventListener('click', function() {
            htmlElement.lang = 'en';
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        });
    }
    
    // 访问量计数器 - 修复版
    // 在实际应用中，这应该从服务器获取
    // 这里使用localStorage模拟
    
    // 获取访问量计数元素
    const visitorCountElement = document.getElementById('visitor-count');
    
    // 确保元素存在
    if (!visitorCountElement) {
        console.error('找不到visitor-count元素');
        return;
    }
    
    // 检查是否是本次会话的首次访问
    const sessionVisited = sessionStorage.getItem('visited');
    
    // 获取当前访问计数
    let visitorCount = localStorage.getItem('visitorCount');
    
    // 如果是第一次访问网站，初始化为1
    if (visitorCount === null) {
        visitorCount = 1;
        localStorage.setItem('visitorCount', visitorCount);
    } else {
        // 转换为数字
        visitorCount = parseInt(visitorCount);
        
        // 如果是本次会话的首次访问，增加计数
        if (!sessionVisited) {
            visitorCount += 1;
            localStorage.setItem('visitorCount', visitorCount.toString());
        }
    }
    
    // 标记本次会话已被计入
    sessionStorage.setItem('visited', 'true');
    
    // 显示访问计数
    console.log('当前访问量:', visitorCount); // 调试用
    
    // 检查是否有CountUp对象
    if (typeof CountUp !== 'undefined') {
        // 使用CountUp.js创建动画效果
        const countUpOptions = {
            duration: 2.5,
            useEasing: true,
            useGrouping: true,
        };
        
        const countUp = new CountUp(visitorCountElement, visitorCount, countUpOptions);
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error('CountUp错误:', countUp.error);
            visitorCountElement.textContent = visitorCount;
        }
    } else {
        // 如果CountUp未定义，直接设置文本
        console.warn('CountUp未定义，使用普通显示');
        visitorCountElement.textContent = visitorCount;
    }
    
    // 滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 为时间线项目添加动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // 为荣誉项目添加动画
    const honorItems = document.querySelectorAll('.honor-item');
    if (honorItems.length > 0) {
        const honorObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        honorItems.forEach(item => {
            honorObserver.observe(item);
        });
    }
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加导航高亮
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});