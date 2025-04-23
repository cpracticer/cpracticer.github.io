document.addEventListener('DOMContentLoaded', function() {
    // 设置初始语言
    const htmlElement = document.documentElement;
    htmlElement.lang = 'zh';
    
    // 语言切换功能
    const zhBtn = document.getElementById('zh-btn');
    const enBtn = document.getElementById('en-btn');
    
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
    
    // 访问量计数器
    // 在实际应用中，这应该从服务器获取
    // 这里使用localStorage模拟
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    // 使用CountUp.js创建动画效果
    const countUpOptions = {
        duration: 2.5,
        useEasing: true,
        useGrouping: true,
    };
    
    const visitorCountElement = document.getElementById('visitor-count');
    const countUp = new CountUp(visitorCountElement, visitorCount, countUpOptions);
    if (!countUp.error) {
        countUp.start();
    } else {
        visitorCountElement.textContent = visitorCount;
    }
    
    // 滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 为时间线项目添加动画
    const timelineObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // 为荣誉项目添加动画
    const honorObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const honorItems = document.querySelectorAll('.honor-item');
    honorItems.forEach(item => {
        honorObserver.observe(item);
    });
    
    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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